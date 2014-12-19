[![Build Status](https://travis-ci.org/justsml/git-info-tiny.svg?branch=master)](https://travis-ci.org/justsml/git-info-tiny)

Install
-----------
```
	npm install git-info-tiny
```
Run tests
```
	make test
```

Usage
-----------
Returns current project info from git.

Example Response:
```javascript
{
	tinySHA: 'e004ccf',
	SHA: 'e004ccf3a9a426ab80166d51d56e0c8c9414893c',
	currentBranch: 'master',
	lastCommitTime: '"2014-12-19 14:08:12 -0700"',
	currentUser: 'Dan Levy',
	smallSHA: 'e004ccf3a9a426ab',
	lastCommitMessage: '"travis ci config added"\n',
	lastCommitNumber: '5',
	lastCommitAuthor: '"Dan Levy"',
	remoteUrl: 'git@github.com:justsml/git-info-tiny.git'
}
```


