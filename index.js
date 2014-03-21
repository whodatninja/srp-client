var fs = require('fs');
var path = require('path');
var vm = require('vm');

var srpPath = path.join(__dirname, 'src', 'srp-client.js');
var srpCode = fs.readFileSync(srpPath, 'utf8');

var srp = vm.runInNewContext(srpCode, {require: require});
module.exports = srp.SRPClient;
