resource "aws_s3_bucket" "web_app" {
  bucket = local.web_bucket_name
  acl    = local.acl
  policy = local.web_policy_config_json
  website {
    error_document = "error.html"
    index_document = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "web_app" {
  bucket                  = aws_s3_bucket.web_app.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# used for redirecting www to non www
resource "aws_s3_bucket" "www_web" {
  bucket = local.www_bucket_name
  acl    = local.acl
  policy = local.www_policy_config_json

  website {
    redirect_all_requests_to = "https://${local.web_domain}"
  }
}

resource "aws_s3_bucket_public_access_block" "www_web_app" {
  bucket                  = aws_s3_bucket.www_web.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}