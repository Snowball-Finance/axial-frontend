resource "aws_cloudfront_distribution" "this" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = local.root_object
  aliases             = [local.domain]
  origin {
    domain_name = aws_s3_bucket.web_app.bucket_regional_domain_name
    origin_id   = local.origin_id
  }

  # fixes for SPA
  custom_error_response {
    error_code         = 400
    response_code      = 200
    response_page_path = "/index.html"
  }

  # fixes for SPA
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  # fixes for SPA
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

    forwarded_values {
      query_string = true
      cookies {
        forward = "all"
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
