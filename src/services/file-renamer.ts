import { FileInfo } from '../models/file-info';

var fs = require('fs');

export class FileRenamer {
  rename = (fileInfo : FileInfo) => {
    return new Promise((fulfill, reject) => {
      fs.rename(`${fileInfo.path}/${fileInfo.originalFileName}`, `${fileInfo.path}/${fileInfo.versionedFileName}`, (err) => {
        if (err) {
          console.log(err);
          reject();
        } else {
          fulfill(true);
        }
      });
    });
  }
}