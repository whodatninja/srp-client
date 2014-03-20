var Benchmark = require('benchmark');

var numZeros = 20;
var suite = new Benchmark.Suite();

var nZeros = function(n) {
	if (n === undefined) {
		n = numZeros;
	}

    if(n < 1) return '';
    var t = nZeros(n >> 1);
    
    return ((n & 1) === 0) ?
      t + t : t + t + '0';  
};

suite.add('Current method', nZeros);
suite.add('Naive method', function() {
	return Array(numZeros +1).join('0');
});
suite.on('cycle', function(event) {
  console.log(String(event.target));
});
suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});
// run async
suite.run({ 'async': true });