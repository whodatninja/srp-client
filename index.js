// var fs = require('fs');
// var path = require('path');
// var vm = require('vm');


// var srpPath = path.join(__dirname, 'src', 'srp-client.js');
// var srpCode = fs.readFileSync(srpPath, 'utf8');
// var sandbox = {require: require};
// vm.runInNewContext(srpCode, sandbox);

module.exports = require('./src/srp-client.js');