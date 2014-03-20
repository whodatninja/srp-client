var fs = require('fs');
var vm = require('vm');

srpCode = fs.readFileSync('./src/srp-client.js', 'utf8');
vm.runInThisContext(srpCode);
module.exports = SRPClient;
