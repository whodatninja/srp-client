var test = require('tap').test;

var bits = 2048;
var username = 'mukmuk';
var password = 'iam#1marmot';
var srp, srv, cli, salt, v;

test('Load SRP library', function(t) {
	srp = require('../index');
	t.ok(srp, 'SRP library loaded');
	t.end();
});

test('Instantiate server and client', function(t) {
	cli = new srp(username, password, bits);
	t.ok(cli, 'Client instantiated');
	srv = new srp('mukmuk', null, bits);
	t.ok(srv, 'Server instantiated');
	t.end();
});

test('Authenticate', function(t) {
	var c = {};
	var s = {};

	s.salt = cli.randomHexSalt();
	s.v = srv.parseBigInt(cli.calculateV(s.salt).toString());
	cli = new srp(username, password, bits);
	t.ok(cli, 'Client re-instantiated');

	c.a = cli.srpRandom();
	t.ok(c.a, 'a calculated from srpRandom');
	c.A = cli.calculateA(c.a);
	t.ok(c.a, 'A calculated from a');

	s.A = srv.parseBigInt(c.A.toString());
	t.equal(c.A.toString(), s.A.toString(), 'A\'s match');

	s.b = srv.srpRandom();
	s.B = srv.calculateB(s.b, s.v);
	s.u = srv.calculateU(s.A, s.B);

	c.B = cli.parseBigInt(s.B.toString());
	c.salt = s.salt;
	c.u = cli.calculateU(c.A, c.B);
	t.equal(c.u.toString(), s.u.toString(), 'U\'s match');

	s.Ss = srv.calculateServerS(s.A, s.v, s.u, s.b);
	c.Sc = cli.calculateS(c.B, c.salt, c.u, c.a);

	t.equal(c.Sc.toString(), s.Ss.toString(), 'Tokens match');

	t.end();
});