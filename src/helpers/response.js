function responseBuilder({
  reqUrl, message, data, code, err,
}) {
  const response = {};

  if (!reqUrl) throw new Error('Request URL is required.');
  response.reqUrl = reqUrl;
  if (message) response.message = message;
  response.data = data || {};
  response.error = err || null;
  response.statusCode = code || 200;
  return response;
}

// const createResponse = (obj) => responseBuilder(obj);

export default responseBuilder;
