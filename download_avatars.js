const request = require('request');
const KEYS = require('./secrets');

console.log("Welcome to the Github Avatar Downloader!!!");

function getRepoContributors(repoOwner, repoName, cb) {
  let options = {
    url:
    'https://api.github.com/repos/' +
    repoOwner +
    '/' +
    repoName +
    '/contributors',
    headers: {
    'User-Agent': 'request',
    Authorization: `token ${KEYS.GITHUB_TOKEN}`
    }
  };
  request(options, function(err, res, body) {
    let result = JSON.parse(body);
    cb(err, result);
  });
}

const logContributers = (err, result) => {
  if (err) {
    console.log(err);
  } else {
    result.map(contributer => {
      downloadImageByURL(
        `${contributer.avatar_url}`,
        `avatars/${contributer.login}.png`
      );
    });
  }
};

const downloadImageByURL = (url, filepath) => {
  request
    .get(url)
    .on('error', err => {
      throw err;
    })
    .on('end', () => {
      console.log('Downloading Github Avatar Image!!');
    })
    .pipe(fs.createWriteStream(filepath))
    .on('finish', () => {
      console.log('SUCCESS, Github Avatar Download Complete!!')
    });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});