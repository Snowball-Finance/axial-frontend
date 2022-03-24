locals {
  region            = "us-west-2"
  web_origin_id     = "axial-web-app"
  web_bucket_name   = "app.axial.exchange"
  web_domain        = "app.axial.exchange"
  www_web_domain    = "www.app.axial.exchange"
  www_bucket_name   = "www.app.axial.exchange"
  www_web_origin_id = "www-axial-web-app"
  env               = "prod"
}

locals {
  acl = "private"
  web_policy_config_json = jsonencode({
    "Version" : "2008-10-17",
    "Statement" : [
      {
        "Sid" : "AllowPublicRead",
        "Effect" : "Allow",
        "Principal" : {
          "AWS" : "${aws_cloudfront_origin_access_identity.web.iam_arn}"
        },
        "Action" : "s3:GetObject",
        "Resource" : "arn:aws:s3:::${local.web_bucket_name}/*"
      }
    ]
    }
  )

  www_policy_config_json = jsonencode({
    "Version" : "2008-10-17",
    "Statement" : [
      {
        "Sid" : "AllowPublicRead",
        "Effect" : "Allow",
        "Principal" : {
          "AWS" : "${aws_cloudfront_origin_access_identity.www_web.iam_arn}"
        },
        "Action" : "s3:GetObject",
        "Resource" : "arn:aws:s3:::${local.www_bucket_name}/*"
      }
    ]
    }
  )
}
