exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ token: process.env.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 || "No token set" })
  };
};
