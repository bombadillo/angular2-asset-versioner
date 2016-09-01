var glob = require('glob');

export class FileRetriever {
  retrieve = (path) => {
    var options = {ignore: 'node_modules/**'}; 

    return new Promise((fulfill, reject) => {
      glob(path, options, function (er, files) {
        if (er) {
          console.log('err')
          reject();
        } else {
          console.log('got files')
          fulfill(files);
        }
      });
    });    
  }  
}