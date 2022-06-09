locals {
  region            = "us-west-2"
  web_origin_id     = "classic-axial-web-app"
  web_bucket_name   = "classic.axial.exchange"
  web_domain        = "classic.axial.exchange"
  www_web_domain    = "www.classic.axial.exchange"
  www_bucket_name   = "www.classic.axial.exchange"
  www_web_origin_id = "www-classic-axial-web-app"
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
