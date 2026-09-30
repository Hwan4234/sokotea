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

module.exports = config;
