provider "aws" {
  region  = "us-west-2"
  version = "3.22"
}

terraform {
  backend "s3" {
    encrypt        = true
    key            = "vault.tfstate"
    bucket         = "dev-snowball-terraform-state"
    dynamodb_table = "dev-snowball-terraform-state-lock"
    region         = "us-west-2"
  }
}
