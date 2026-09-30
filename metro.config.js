const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { FileStore } = require('@expo/metro/metro-cache');

const config = getDefaultConfig(__dirname);

// Keep Metro caches inside the project instead of the shared /tmp.
// On multi-user servers (OSU flip), /tmp/metro-cache may already be owned
// by another user, which makes Metro fail with EACCES.
const cacheRoot = path.join(__dirname, 'node_modules', '.cache', 'metro');

config.cacheStores = [new FileStore({ root: cacheRoot })];
config.fileMapCacheDirectory = cacheRoot;

// Limit the number of transform workers. OSU flip caps each user at 200
// processes+threads (ulimit -u 200), and each worker is a separate Node
// process with its own threads. By default Metro starts one worker per CPU
// core, which together with ngrok and other tools can hit the cap and make
// Metro or npm fail with EAGAIN.
config.maxWorkers = 2;

module.exports = config;
