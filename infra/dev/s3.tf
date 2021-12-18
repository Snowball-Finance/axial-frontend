locals {
  acl = "public-read"
}

resource "aws_s3_bucket" "web_app" {
  bucket = local.bucket_name
  acl    = local.acl
  policy = data.aws_iam_policy_document.s3.json
  force_destroy = true
  lifecycle {
    prevent_destroy = false
  }
  website {
    error_document = "error.html"
    index_document = "index.html"
  }
}

data "aws_iam_policy_document" "s3" {
  statement { 
    sid = "AllowPublicRead"
    effect = "Allow"
    actions = [ "s3:GetObject"]
    resources = [
      "arn:aws:s3:::${local.bucket_name}",
      "arn:aws:s3:::${local.bucket_name}/*"
    ]
    principals {
      identifiers = ["*"]
      type = "*"
    }
  }
}
