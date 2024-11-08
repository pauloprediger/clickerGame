import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	{
		files: ['**/*.{js,mjs,cjs,jsx}'],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
		},
		...pluginJs.configs.recommended, // Incluindo as regras recomendadas do ESLint
		...pluginReact.configs.flat.recommended, // Incluindo as regras recomendadas para React
		rules: {
			'indent': ['error', 'tab'], // Recuo com 2 espaços
			'quotes': ['error', 'single'], // Usa aspas simples
			'semi': ['error', 'always'], // Ponto e vírgula obrigatório
			'eqeqeq': ['error', 'always'], // Usa '===' ao invés de '=='
			'no-unused-vars': ['warn'], // Alerta para variáveis não utilizadas
			//"curly": ["error", "all"], // Usa chaves em todos os blocos
		},
	},
];