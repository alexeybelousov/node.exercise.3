const fs = require('fs');

module.exports = (path, callback) => {
  fs.stat(path, (err, stats) => {
    if (err) callback(err, undefined);
    if (stats.isFile()) {
      fs.readFile(path, { encoding: 'utf8' }, (err, content) => {
        if (err) callback(err, undefined);
        callback(null, {
          path: path,
          type: 'file',
          content: content,
          childs: undefined
        });
      });
    } else {
      fs.readdir(path, (err, files) => {
        if (err) callback(err, undefined);
        callback(null, {
          path: path,
          type: 'directory',
          content: undefined,
          childs: files
        });
      });
    }
  });
}
