provider "aws" {
  region  = "us-west-2"
  version = "3.22"
}

terraform {
  backend "s3" {
    encrypt        = true
    key            = "axial-web-app.tfstate"
    bucket         = "prod-snowball-terraform-state"
    dynamodb_table = "prod-snowball-terraform-state-lock"
    region         = "us-west-2"
  }
}
