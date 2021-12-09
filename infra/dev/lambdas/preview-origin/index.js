exports.handler = (event, context, callback) => {
  console.log("request made")
    const { request } = event.Records[0].cf;
    try {
      const host = request.headers['x-forwarded-host'][0].value;
      const branch = host.match(/^preview-([^\.]+)/)[1];
      request.origin.custom.path = `/${branch}`;
    } catch (e) {
     callback(null, request)
    }
    console.log(request)
    callback(null, request)
  };
