
import { test } from './utility/helpers';


test(
	'Basic functionality',
	'@raw { $foo: #f00; }',
	'$foo: #f00'
);

test(
	// Because we `postcss-simple-vars` in the test stack
	// We change that stuff inside `@raw` doesn't get touched
	'Does not mangle',
	'$foo: #0f0; @raw { $foo: #f00; }',
	'$foo: #f00'
);

test(
	'Does not mangle other at-rules',
	'@raw {  $foo: #f00; } @context something { .foo { color: #f00; } }',
	'$foo: #f00; @context something { .foo { color: #f00; } }'
);

test(
	'Remove empty raw at-rule',
	'@raw { }',
	''
);

test(
	'Maintain order',
	'@raw { $foo: #f00; $bar: #0f0; }',
	'$foo: #f00;$bar: #0f0'
);

test(
	'Custom at-rule keyword',
	'@myCustomRawKeyword { $foo: #f00; }',
	'$foo: #f00',
	{
		atRuleKeyword: 'myCustomRawKeyword'
	}
);
