data "aws_route53_zone" "snowapi_net" {
  name = "axial.exchange"
}

resource "aws_route53_record" "dev" {
  name    = local.sub_domain
  type    = "A"
  zone_id = data.aws_route53_zone.snowapi_net.zone_id
  alias {
    evaluate_target_health = false
    name                   = aws_cloudfront_distribution.this.domain_name
    zone_id                = aws_cloudfront_distribution.this.hosted_zone_id
  }
}

module "acm" {
  source      = "../acm"
  domain_name = local.domain
  aws_region  = "us-east-1"
  zone_id     = data.aws_route53_zone.snowapi_net.zone_id
  tags = {
    Name = "${local.env}-${local.domain}"
  }
}
