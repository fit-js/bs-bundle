import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	input: './module',
	output: {
		file: 'bundle.js',
		format: 'cjs'
	},
	external: [
		'utf-8-validte',

		'assert',
		'fs',
		'path',
		'process',
		'events',
		'module',
		'http',
		'https',
		'os',
		'url',
		'util',
		'punycode',
		'buffer',
		'zlib',
		'dgram',
		'querystring',
		'string_decoder',
		'tls',
		'crypto',
		'dns',
		'constants',
		'net',
		'child_process',
		'stream',
		'tty'
	],
	name: 'bs-bundle',
	plugins: [
		nodeResolve ({
			jsnext: true,
			main: true,
			module: true,
			preferBuiltins: true
		}),
		commonjs ({
			include: 'node_modules/**',
			ignoreGlobal: false,
			sourceMap: false
		})
	]
};
