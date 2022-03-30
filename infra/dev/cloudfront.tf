resource "aws_cloudfront_origin_access_identity" "web" {
  comment = "${local.env} axial app origin"
}

resource "aws_cloudfront_distribution" "this" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = local.root_object
  aliases             = [local.domain, local.wildcard_domain]

  origin {
    domain_name = aws_s3_bucket.web_app.website_endpoint
    origin_id   = local.origin_id
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }
    # fixes for routing
  custom_error_response {
    error_code         = 400
    response_code      = 200
    response_page_path = "/index.html"
  }

  # fixes for routing
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  # fixes for routing
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  default_cache_behavior {
    target_origin_id = local.origin_id
    compress         = true
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]

    lambda_function_association {
      event_type   = "origin-request"
      lambda_arn   = module.origin_lambda.qualified_arn
      include_body = false
    }
  
    lambda_function_association {
      event_type   = "viewer-request"
      lambda_arn   = module.viewer_lambda.qualified_arn
      include_body = false
    }

    forwarded_values {
      query_string = false
      headers      = ["x-forwarded-host", "Origin"]
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 7200
    max_ttl                = 86400
  }

  viewer_certificate {
    ssl_support_method             = "sni-only"
    acm_certificate_arn            = module.acm.arn
    minimum_protocol_version       = "TLSv1.1_2016"
    cloudfront_default_certificate = false
  }
}
