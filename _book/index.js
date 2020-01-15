#!/usr/bin/env node
let Server = require('./cli/server.js');
var path = require('path');
var server = new Server();
server.start(path.join(process.cwd()+'/_mobile'), 8005)
