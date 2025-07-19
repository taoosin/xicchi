// netlify/functions/get-token.js

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: process.env.GITHUB_TOKEN || "No token set"
  };
};
