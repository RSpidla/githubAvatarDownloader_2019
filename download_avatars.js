const request = require('request');
const fs = require('fs');
const KEYS = require('./secrets');
const [name, owner] = process.argv.slice(2);

// Display user welsome message
console.log("Welcome to the Github Avatar Downloader!!!");

// Check username and repo name
  // if error print user error message to standard output
  // else deliver user credentials for data request
  // then request body and parse to JSON
function getRepoContributors(repoOwner, repoName, cb) {
  if (repoOwner === undefined) {
      console.log('Please enter Owner Name');
  } else if (repoName === undefined) {
      console.log('Please enter Repo Name');
  } else {
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
}

// Check for errors
  // if error print to standard output
  // else call download avatar function on every element in array
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

// Download avatar images
  // Display user success message when download complete
const downloadImageByURL = (url, filepath) => {
  request
    .get(url)
    .on('error', err => {
      throw err;
    })
    .on('end', () => {
      console.log('WORKING ON IT, Downloading Github Avatar Image!!');
    })
    .pipe(fs.createWriteStream(filepath))
    .on('finish', () => {
      console.log('SUCCESS, Github Avatar Download Complete!!')
    });
}

// Invoke function with command line arguments and callback
getRepoContributors(name, owner, logContributers);