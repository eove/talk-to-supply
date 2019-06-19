#!/usr/bin/env node
const { version } = require('./package.json');
const program = require('commander');
const { createCommunicator } = require('@eove/power-supply-com');
const debug = require('debug')('talk-to-analyzer');

const {
  createShellClient,
  createShellServer,
  DEFAULT_CONFIG
} = require('./lib');

program
  .command('com')
  .description('talk to power supply')
  .option(
    '-p, --port-name [PORT_NAME]',
    'PORT_NAME is the USB port where the power supply is connected',
    DEFAULT_CONFIG.USB_PORT
  )
  .option(
    '-l, --listen-shell-on [HOST:PORT]',
    'HOST:PORT is the inet to listen for ZMQ shell requests',
    `${DEFAULT_CONFIG.ZMQ_HOST}:${DEFAULT_CONFIG.ZMQ_PORT}`
  )
  .option(
    '-z, --zmq-sink [HOST:PORT]',
    'HOST:PORT is the zeromq address used by ZMQ dispatcher'
  )
  .option('-x, --exit-on-error', 'exit when error occurs', false)
  .option('-d, --debug-enabled', 'output debug messages to the console', false)
  .option(
    '-t, --transport-debug-enabled',
    'output low level debug messages to the console',
    false
  )
  .option(
    '-s, --supply [SUPPLY]',
    'SUPPLY is the power supply type, one of [it6932a]',
    DEFAULT_CONFIG.DEVICE_TYPE
  )
  .action(options => {
    const { portName } = options;
    const logErrorAndExit = makeLogErrorAndMayExit(options.exitOnError);
    try {
      debug.enabled = options.debugEnabled;
      options.deviceType = options.analyzer;
      debug(`creating communicator for device type: ${options.analyzer}`);
      const communicator = createCommunicator(portName, options);
      communicator.event$.subscribe(event => debug('event:', event));
      communicator.answer$.subscribe(answer => debug('answer:', answer));
      communicator.command$.subscribe(event => debug('command:', event));
      const server = createShellServer(
        {
          communicator,
          debug: (...args) => debug(...args)
        },
        options
      );

      communicator
        .open()
        .then(() => {
          server.start();
        })
        .catch(e => logErrorAndExit(e));
    } catch (e) {
      logErrorAndExit(e);
    }
  });

program
  .command('list-ports')
  .description('list avaiable ports')
  .action(() => {
    const communicator = createCommunicator();
    communicator.listPorts().then(ports => {
      ports.map(p => console.log(p.name));
    });
  });

program
  .command('shell')
  .description('run interactive shell to talk to com')
  .option(
    '-s, --send-shell-on [HOST:PORT]',
    'HOST:PORT is the inet to send ZMQ requests to',
    `${DEFAULT_CONFIG.ZMQ_HOST}:${DEFAULT_CONFIG.ZMQ_PORT}`
  )
  .option(
    '-t, --timeout [TIMEOUT]',
    'TIMEOUT is the number of seconds to wait for the com answer',
    DEFAULT_CONFIG.ZMQ_TIMEOUT
  )
  .action(options => {
    try {
      const client = createShellClient(
        {
          debug: (...args) => debug(...args)
        },
        options
      );
      client.start();
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });

program.version(version).parse(process.argv);

process.on('unhandledRejection', e => {
  const logErrorAndExit = makeLogErrorAndMayExit(globalOptions.exitOnError);
  logErrorAndExit(e, 'Oops! unhandled rejection!');
});

function makeLogErrorAndMayExit(exitOnError) {
  return (e, msg = undefined, rc = 1) => {
    if (msg) {
      console.error(msg);
    }
    console.error(e);
    if (exitOnError) {
      process.exit(rc);
    }
  };
}
