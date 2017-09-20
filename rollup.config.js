import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';

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
			preferBuiltins: true
		}),
		commonjs ({
			include: 'node_modules/**',
			ignore: ['emitter', 'socket.io-client/package'],
			ignoreGlobal: false,
			sourceMap: false
		}),
		json()
	]
};


/* TODO:
	1:
	remove in files:
		node_modules/browser-sync/index.js
		node_modules/dev-ip/lib/dev-ip.js

	comment 124 - 136 lines in file: node_modules/aws-sign2/index.js
	comment 9 - 11, 13 lines in file: node_modules/ws/lib/Bufferutil.js
*/
