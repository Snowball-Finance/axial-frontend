locals {
  acl = "public-read"
  policy_config_json = jsonencode({
    "Version" : "2008-10-17",
    "Statement" : [
      {
        "Sid" : "AllowPublicRead",
        "Effect" : "Allow",
        "Principal" : {
          "AWS" : "*"
        },
        "Action" : "s3:GetObject",
        "Resource" : "arn:aws:s3:::${local.bucket_name}/*"
      }
    ]
    }
  )
}

resource "aws_s3_bucket" "web_app" {
  bucket = local.bucket_name
  acl    = local.acl
  policy = local.policy_config_json
  force_destroy = true
  lifecycle {
    prevent_destroy = false
  }
  website {
    error_document = "error.html"
    index_document = "index.html"
  }
}
