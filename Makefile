export
AWS_PROFILE=snowball
dev_S3_BUCKET=dev-app.axial.exchange
staging_S3_BUCKET=dev-stg.axial.exchange
prod_S3_BUCKET=app.axial.exchange
prod_classic_S3_BUCKET=classic
dev_DISTRIBUTION_ID=E2AS5XGPCS3Z5V
staging_DISTRIBUTION_ID=
prod_DISTRIBUTION_ID=E2N82FJBD6LE57
prod_classic_DISTRIBUTION_ID=E1FJOPE4GEPHGX

test-envvars:
	@[ "${env}" ] || ( echo "env var is not set"; exit 1 )

build: test-envvars
	npm run build

all: build
	aws s3 cp --recursive build/ s3://${${env}_S3_BUCKET} && aws cloudfront create-invalidation \
	--distribution-id ${${env}_DISTRIBUTION_ID} \
	--paths "/*"
