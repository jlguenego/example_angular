exports.config = {
	allScriptsTimeout: 11000,

	specs: [
	'e2e/*.js'
	],

	capabilities: {
		browserName: 'chrome'
	},

	chromeOnly: true,

	baseUrl: 'http://localhost:8000/app/25_protractor/',

	framework: 'jasmine',

	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000
	}
};
