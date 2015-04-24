var fs = require('fs');
var path = require('path');

var root = path.normalize(__dirname + '/../..');
var angularLocaleDir = path.normalize(root + '/bower_components/angular-i18n');
var localeDir = path.normalize(root + '/27_i18n/i18n/locale');

function main() {
	var localeFiles = fs.readdirSync(angularLocaleDir);

	if (!fs.existsSync(localeDir)) {
		fs.mkdirSync(localeDir);
	}

	localeFiles.forEach(function(fname) {
		if (!fname.match(/\.js$/)) {
			return;
		}
		createLocaleFile(fname);
	});
	console.log('Finished with success.');
}

function createLocaleFile(fname) {
	var fpath = path.normalize(angularLocaleDir + '/' + fname);
	var content = fs.readFileSync(fpath).toString();

	var newFname = fname.replace('angular-', '').replace('.js', '.json');
	var newFpath = path.normalize(localeDir + '/' + newFname);

	content = content.replace(/\n/gm, '__newLine__')
					.replace(/^.*"\$locale",\s*/, '')
					.replace(/(.*),(\s*__newLine__\s*)*"pluralCat".*/, '$1')
					.replace(/__newLine__/g, '\n');
	content += '\n}';
	fs.writeFileSync(newFpath, content);
	console.log(fname + ': File created.');
}

main();
