const painless = require('../../assertion/painless')
const test = painless.createGroup('Test promise/promisify')
const t = painless.assert

const promisify = require('../../../src/promise/promisify')

test('should convert a callback interface to a promise interface', async () => {
		function pass(a, b, cb) {
			cb(null, a + b)
		}

		function fail(a, b, cb) {
			cb('derp')
		}

		const passPromise = promisify(pass)
		const failPromise = promisify(fail)

		t.equal(await passPromise(1, 2), 3)

		try {
			await failPromise(1, 2)
			t.fail('should throw')
		} catch (e) {
			t.pass('should throw')
		}
	});