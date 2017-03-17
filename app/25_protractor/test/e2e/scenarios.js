(function() {
	'use strict';

	describe('Hello World app', function() {

		describe('Main page', function() {

			beforeEach(function() {
				browser.get('app/index.html');
			});

			it('should reflect the message when typing it', function() {
				var input = element(by.css('input'));
				var text = element.all(by.css('h1')).get(1);
				input.clear();
				input.sendKeys('coucou');
				expect(text.getText()).toEqual('coucou');
			});

			it('should call the webservice that wait for 2s and catch the message', function() {
				var button = element(by.css('button'));
				var webServiceMsg = element(by.css('#webServiceMsg'));
				button.click();
				expect(webServiceMsg.getText()).toEqual('This is the webservice content');
			});
		});
	});
})();
