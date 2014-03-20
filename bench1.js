var Benchmark = require('benchmark');
var crypto = require('crypto');
var sjcl = require('sjcl');

var suite = new Benchmark.Suite();
var hex = '1e1e63b10f128a132f30f1e38ee0d42f';

// add tests
suite.add('Stanford', function() {
	sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(sjcl.codec.hex.toBits(hex)));
})
.add('Node', function() {
	crypto.createHash('sha256').update(new Buffer(hex, 'hex')).digest('hex');
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run({ 'async': true });