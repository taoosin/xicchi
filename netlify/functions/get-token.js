
const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { fileContent, pathInRepo, commitMessage } = JSON.parse(event.body);
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    if (!GITHUB_TOKEN) throw new Error("GitHub Token not configured.");

    // আপনার ইউজারনেম এবং রিপোজিটরির নাম এখানে আপডেট করা হয়েছে
    const GITHUB_USERNAME = "YaminDeveloper";
    const GITHUB_REPO = "Uploaded";
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${pathInRepo}`;

    const requestBody = {
      message: commitMessage,
      content: fileContent,
      branch: "main"
    };

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
      return { statusCode: response.status, body: JSON.stringify({ message: data.message }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "File uploaded successfully!",
        rawUrl: data.content.download_url.replace('?raw=true', '').replace('//api.github.com/repos', '//raw.githubusercontent.com').replace('/contents', '')
      })
    };

  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
  }
};
