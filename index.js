/*
 * git-info-tiny
 * https://github.com/justsml/git-info-tiny
 * 
 * Credit:
 * Dan Levy, Damian Krawczyk, Corey Jewett, Maciej Lisiewski, Tom Gault, kolya-ay, nerdgore, madarche, drasive
 * Licensed under the MIT license.
 */

// JSLint
/*jslint node: true */


module.exports = function (options, callback) {
	'use strict'
	var	path = require('path'),
			workQueue, task, done, commands;

	options = options || {}
	// default to THIS file's *parent*'s path
	options.cwd = options.path || path.resolve(__dirname, '..')

	commands = {
		'name'              : ['rev-parse', '--abbrev-ref', 'HEAD'],
		'SHA'               : ['rev-parse', 'HEAD'],
		'tinySHA'           : ['rev-parse', '--short', 'HEAD'],
		'smallSHA'          : ['rev-parse', '--short=16', 'HEAD'],
		'currentUser'       : ['config', '--global', 'user.name'],
		'lastCommitTime'    : ['log', '--format="%ai"', '-n1', 'HEAD'],
		'lastCommitMessage' : ['log', '--format="%B"', '-n1', 'HEAD'],
		'lastCommitAuthor'  : ['log', '--format="%aN"', '-n1', 'HEAD'],
		'lastCommitNumber'  : ['rev-list', '--count', 'HEAD'],
		'remoteUrl'					: ['config', '--get-all', 'remote.origin.url']
	}
	task = function(key, cb) {
		var results = [],
			args = commands[key],
			proc = require('child_process').spawn('git', args, {cwd: options.cwd })
		proc.stdout.on('data', function(data) {
			results.push(data)
		})
		proc.on('error', cb) // pass the err direct to the async callback
		proc.stdout.on('close', function(data) {
			cb(null, {key: key, results: results.join('').replace(/\n|\r$/, '') })
		})
	}
	workQueue = Array.prototype.map.call(Object.keys(commands), function(key) { 
		return function _task(cb) {
			task(key, cb);
		}
	})
	// Just hoping this speeds up processing in build & test scripts
	// ... I might get rid of the async dependancy
	require('async').parallelLimit(workQueue, 4, function(err, results) {
		callback(err, results)
	})
		
}

