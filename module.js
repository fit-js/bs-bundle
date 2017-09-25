import { args, globals } from 'fit-core';
import bs from 'browser-sync';

export function init (config) {
	if (args.env() === 'develop') {
		let current = bs.create ('app');

		let options = {
			ui: false,
			notify: true,
			online: true,
			open: false,
			cors: true,
			reloadOnRestart: true,
			logFileChanges: false,
			logConnections: false
		};


		if (!config.proxy && config.root) {
			options.server = {
				baseDir: config.root
			};
		}

		if (config.proxy) {
			options.proxy = {
				target: config.proxy
			};
		}

		if (config.proxy && config.assets) {
			options.serveStatic = [{
				route: config.assets.alias,
				dir: config.assets.path
			}];
		}

		if (config.watch) {
			current
				.watch (config.watch, {
					cwd: config.assets.path
				})
				.on ('change', current.reload);
		}

		current.init (options);

		globals.set ('bs', current);
	}
}
