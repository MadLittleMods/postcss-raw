import objectAssign from 'object-assign';

import postcss from 'postcss';


const atRuleToChildNodesMap = new Map();

const defaults = {
	atRuleKeyword: 'raw'
};
export const inspect = postcss.plugin('postcss-raw-inspect', (options) => {
	let opts = objectAssign({}, defaults, options);

	return function (css/*, result*/) {
		css.walkAtRules(opts.atRuleKeyword, (atRule) => {
			// Store the children/contents
			atRuleToChildNodesMap.set(atRule, atRule.nodes.map((node) => {
				return node.clone();
			}));

			// Clear it out so other plugins can't touch it
			atRule.removeAll();
		});
	};
});

export const write = postcss.plugin('postcss-raw-write', (options) => {
	let opts = objectAssign({}, defaults, options);

	return function (css/*, result*/) {
		css.walkAtRules(opts.atRuleKeyword, (atRule) => {
			// Put the contents back in the same place but outside of the at-rule
			const originalChildrenNodes = atRuleToChildNodesMap.get(atRule);
			if(originalChildrenNodes) {
				originalChildrenNodes.reverse().forEach((originalNode) => {
					atRule.parent.insertAfter(atRule, originalNode);
				});
			}
			// Then remove the at-rule
			atRule.remove();
		});
	};
});
