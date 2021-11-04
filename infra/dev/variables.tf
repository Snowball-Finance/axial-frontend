
locals {
  region      = "us-east-1"
  domain      = "${local.sub_domain}.axial.exchange"
  bucket_name = "${local.sub_domain}.axial.exchange"
  origin_id   = "dev-app"
  root_object = "index.html"

  sub_domain = "dev-app"
  env         = "dev"
}
