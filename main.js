var fs  = require('fs')
  , walk = require('walk')
  , path = require('path')
  , cwd = process.cwd()
  ;

var find = function (name, cb) {
  walker = walk.walk(cwd);
  walker.on('directories', function (root, dirs, next) {
    dirs.forEach(function (dir) {
      if (dir.name == name) {
        walker.removeAllListeners()
        cb(path.resolve(dir.name))
      }
    })
    next()
  })
}

exports.find = find
