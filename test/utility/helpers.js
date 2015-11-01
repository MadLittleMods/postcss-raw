import { argv } from 'yargs';

import tape from 'tape';

import postcss from 'postcss';
import simpleVars from 'postcss-simple-vars';
import { inspect as rawInspect, write as rawWrite } from '../../';


let harness = tape;


let testFilter = argv.grep || argv.g;
let testFilterRe = new RegExp(testFilter);
let shouldRunTest = function(name) {
	if(testFilter) {
		return testFilterRe.test(name);
	}

	return true;
};



export function test(name, actual, expected, opts = {}) {
	if (shouldRunTest(name)) {
		harness(name, (t) => {
			t.plan(1);

			let results = postcss([
					rawInspect(opts),
					simpleVars(),
					rawWrite(opts)
				])
				.process(actual)
				.css;

			t.equal(results, expected);
		});
	}
}


export { harness };
