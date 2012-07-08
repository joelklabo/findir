var fs  = require('fs')
  , walk = require('walk')
  , path = require('path')
  , cwd = process.cwd()
  ;

var isIgnored = function (root, ignoreDirs) {
  if (!ignoreDirs.length) { return false }
  ignoreDirs.forEach(function (dir) {
    if (root.indexOf(dir)) {
      return true
    }
  })
  return false
}

var find = function (name, opts, cb) {
  if (!cb) {cb = opts; opts = {}}
  if (!opts.ignore) {opts.ignore = []}
  var ignoreDirs = opts.ignore

  walker = walk.walk(cwd);
  walker.on('directories', function (root, dirs, next) {
    dirs.forEach(function (dir) {
      if (!isIgnored(root, ignoreDirs) && dir.name == name) {
        walker.removeAllListeners()
        cb(path.join(root, name))
      }
    })
    next()
  })
}

exports.find = find
