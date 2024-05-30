export const response = async <T = any>(statusCode: number, body: T) => ({
  statusCode: statusCode,
  body: JSON.stringify(body),
});
