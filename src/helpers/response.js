function responseBuilder(obj) {
  const response = {};
  const { reqUrl, message, data, code, err } = obj;

  if (!reqUrl) throw new Error('Request URL is required.');
  response.reqUrl = reqUrl;
  if (message) response.message = message;
  response.data = data || {};
  response.error = err || null;
  response.statusCode = code || 200;
  return response;
}

export default responseBuilder;
