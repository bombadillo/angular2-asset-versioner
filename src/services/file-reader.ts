var fs = require('fs');

export class FileReader {

  readFile = (fileName: string) => {
    return new Promise((fulfill, reject) => {
      fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
          reject();
        } else {
          fulfill(data);
        }        
      });
    });
  }

}