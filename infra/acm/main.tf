variable "zone_id" {
  description = "The zone id from route53 where the certificate is being attached"
  type        = string
}

variable "domain_name" {
  description = "The domain name to used this use this ACM on"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "alternative_names" {
  type = list(string)
  default =  []
}

variable "tags" {
  description = "The associted tags"
  default     = []
}

provider "aws" {
  region = var.aws_region
  version = "3.22"
}

resource "aws_acm_certificate" "acm" {
  domain_name       = var.domain_name
  subject_alternative_names = var.alternative_names 
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
  tags              = var.tags
}

resource "aws_route53_record" "validation_record" {
  for_each = {
    for dvo in aws_acm_certificate.acm.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  name            = each.value.name
  type            = each.value.type
  zone_id         = var.zone_id
  records         = [each.value.record]
  ttl             = 60
  allow_overwrite = true
}

resource "aws_acm_certificate_validation" "validation" {
  certificate_arn         = aws_acm_certificate.acm.arn
  validation_record_fqdns = [for record in aws_route53_record.validation_record : record.fqdn]
}

output "arn" {
  value = aws_acm_certificate.acm.arn
}
