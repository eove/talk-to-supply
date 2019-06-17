# talkToSupply

[![Node Version](https://img.shields.io/badge/node-%3E=8.11.2-brightgreen.svg)]()
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm version](https://badge.fury.io/js/%40eove%2Ftalk-to-supply.svg)](https://badge.fury.io/js/%40eove%2Ftalk-to-supply) [![install size](https://packagephobia.now.sh/badge?p=@eove/talk-to-supply)](https://packagephobia.now.sh/result?p=@eove/talk-to-supply)

CLI to talk to power supply devices (it6932a, ...)

## Install

### Pre requisites

- [node](https://nodejs.org/en/download/package-manager/) (see .nvmrc file for supported version)

### MacOS

```
brew install zmq
git clone git@github.com:eove/talk-to-supply.git
cd talk-to-supply
npm install -g node-gyp
npm install -g
```

### Linux, Raspberry

```
sudo apt-get install -y libglib2.0-dev libzmq3-dev
git clone git@github.com:eove/talk-to-supply.git
cd talk-to-supply
npm install -g node-gyp
npm install -g
```

## Usage

**✋ Read this first!**

To know which USB ports are available on your machine: `talkToSupply list-ports`. May return something like:

```bash
/dev/tty.Bluetooth-Incoming-Port
/dev/tty.usbserial-FTHJLQ5I
```

Then, just run for example: `talkToSupply com -p /dev/tty.usbserial-FTHJLQ5I -d`

- To display debug messages, use the `-d` option
- You will need to pass a port name with the `-p` option.

## Shell

You can interact with the running `talkToSupply com` process to make it send commands.

Start the interactive shell in another terminal with: `talkToSupply shell` while `talkToSupply com ...` is running.

    talk > help

Commands:

    help [command...]               Provides help for a given command.
    exit                            Exits application.
    run [command] [args]            Run the given [command], with optional JSON formatted [args] (see. examples)
    examples                        Show command examples

Tip: To be able to connect remotely, run: `talkToSupply com -p /dev/tty.usbserial-FTHJLQ5I -l 0.0.0.0:9876`
