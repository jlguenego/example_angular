exports.config = {
	//seleniumAddress: 'http://localhost:4444/wd/hub',
	allScriptsTimeout: 11000,

	specs: [
		'e2e/*.js'
	],

	capabilities: {
		browserName: 'chrome'
	},

	chromeOnly: true,

	// pour firefox
	// capabilities: {
	// 	browserName: 'firefox',
	// 	platform: 'WINDOWS'
	// },
	// directConnect: true,

	baseUrl: 'http://localhost:8000/app/25_protractor/',

	framework: 'jasmine',

	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000
	}
};
