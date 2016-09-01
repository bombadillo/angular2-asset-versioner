var fs = require('fs');

export class FileWriter {
  write(fileName, data) {
    return new Promise((fulfill, reject) => {
      fs.writeFile(fileName, data, (err) => {
        if (err) {
          console.log(err);
          reject();
        }
        fulfill(true);
      });
    });
  }
}