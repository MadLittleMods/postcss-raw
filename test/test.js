
import { test } from './utility/helpers';


test(
	'Basic functionality',
	'@raw { $foo: #f00; }',
	'$foo: #f00'
);

test(
	'Does not mangle',
	'$foo: #0f0; @raw { $foo: #f00; }',
	'$foo: #f00'
);

test(
	'Remove empty raw at-rule',
	'@raw { }',
	''
);

test(
	'Custom at-rule keyword',
	'@myCustomRawKeyword { $foo: #f00; }',
	'$foo: #f00',
	{
		atRuleKeyword: 'myCustomRawKeyword'
	}
);
