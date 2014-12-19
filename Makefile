TESTS = test/*.js
REPORTER = spec

test:
	@NODE_ENV=test NODE_TLS_REJECT_UNAUTHORIZED=0 \
	./node_modules/.bin/mocha \
		--require better-assert \
		--reporter $(REPORTER) \
		--timeout 10000 \
		--growl \
		$(TESTS_MODULES)

	
.PHONY: test 



