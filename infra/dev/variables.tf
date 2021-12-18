
locals {
  region      = "us-east-1"
  domain      = "${local.sub_domain}.axial.exchange"
  bucket_name = "${local.sub_domain}.axial.exchange"
  wildcard_domain = "*.${local.domain}"
  origin_id   = "dev-app"
  root_object = "index.html"

  sub_domain = "dev-app"
  env         = "dev"
}

module "origin_lambda" {
  source = "../edge-lambda"
  function_name = "preview-origin"
   aws_region  = "us-east-1"
  env = local.env
}

module "viewer_lambda" {
  source = "../edge-lambda"
  function_name = "preview-viewer"
  aws_region  = "us-east-1"
  env = local.env
}