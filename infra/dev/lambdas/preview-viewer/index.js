exports.handler = (event, context, callback) => {
  console.log("request made")
  const { request } = event.Records[0].cf;
  console.log("request made")
  request.headers['x-forwarded-host'] = [
    {
      key: 'X-Forwarded-Host',
      value: request.headers.host[0].value
    }
  ];
  console.log("host", request.headers.host[0].value)
  callback(null, request)
};
