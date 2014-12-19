var assert = require('better-assert'),
		gitInfo = require('..')



describe('git-info-tiny', function() {
	
	it('has all data', function(done) {
		gitInfo({}, function(err, summary) {
			console.log(summary)
			assert(summary.shortSHA.length >= 16)
			assert(summary.tinySHA.length >= 5)
			assert(summary.name.length > 1)
			assert(summary.SHA.length >= 40)
			assert(summary.currentUser)
			assert(summary.lastCommitTime)
			assert(summary.lastCommitAuthor)
			assert(summary.lastCommitNumber)
			done()
		});
	})

})
