import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import * as pkg from './package.json';

export default {
	input: pkg.module,
	output: {
		file: pkg.main,
		format: 'cjs'
	},
	external: ['fit-core', 'browser-sync'],
	name: pkg.name,
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
