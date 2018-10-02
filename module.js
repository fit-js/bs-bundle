import bs from 'browser-sync';
import { spawn } from 'child_process';
const LOCAL_SERVER_PORT = '2999';

export function init (config, core) {
	if (core.args.env() === 'develop') {
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
		
		if (!config.proxy && config.host) {
			let phpServer;
			let local_server = config.host +':'+ LOCAL_SERVER_PORT;
			
			if (!config.root) {
				phpServer = spawn('php', ['-S', local_server]);
			} else {
				phpServer = spawn('php', ['-S', local_server, '-t', config.root]);
			}
			config.proxy = local_server;
			
			phpServer.stderr.on('data', (data) => {
				console.log('stderr: '+ data);
			});
			
			phpServer.on('close', (code) => {
				console.log('child process exited with code '+ code);
			});
		}
		
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
				.watch (config.watch)
				.on ('change', current.reload);
		}

		current.init (options);

		core.globals.set ('bs', current);
	}
}
