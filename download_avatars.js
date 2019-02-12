const request = require('request');
const KEYS = require('./secrets');

console.log("Welcome to the Github Avatar Downloader!!!");






getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

function getRepoContributors(repoOwner, repoName, cb) {
  if (repoOwner === undefined) {
    console.log('Enter Owner Name:');
  } else if (repoName === undefined) {
    console.log('Enter Repo Name:');
  } else {
    let options = {
      url:
      'https://api.github.com/repos' + repoOwner + '/' + repoName + '/contributors',
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${KEYS.GITHUB_TOKEN}`
      }
    };
    request(options, function(err, res, body) {
      let result = JSON.parse(body);
      cb(err, result);
    });
  }
}








