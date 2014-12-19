var assert = require('better-assert'),
		gitInfo = require('..'),
		path = require('path')



describe('git-info-tiny', function() {
	it('fails gracefully', function(done) {
		gitInfo({path: '/'}, function(err, summary) {
			// console.log(err, summary)
			assert(err)
			assert(err.message.indexOf('Path') > -1)
			assert(!summary || !summary.SHA)
			done()
		});
	})
	it('has valid data', function(done) {
		gitInfo({path: path.resolve(__dirname, '..')}, function(err, summary) {
			// console.log(arguments)
			assert(summary.smallSHA.length >= 16)
			assert(summary.tinySHA.length >= 5)
			assert(summary.currentBranch.length > 1)
			assert(summary.SHA.length >= 40)
			assert(summary.currentUser)
			assert(summary.lastCommitTime)
			assert(summary.lastCommitAuthor)
			assert(summary.lastCommitNumber)
			done()
		});
	})

})
