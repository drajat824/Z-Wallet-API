export default {
	"env": {
		"browser": true,
		"es2021": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 12
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		]
	}
};
