
locals {
  region      = "us-east-1"
  domain      = "${local.sub_domain}.snowapi.net"
  bucket_name = "${local.sub_domain}.snowapi.net"
  origin_id   = "dev-vault-web"
  root_object = "index.html"

  sub_domain = "dev-vault"
  env         = "dev"
}
