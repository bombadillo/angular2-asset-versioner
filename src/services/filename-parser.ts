import { FileInfo } from '../models/file-info';
import { FileVersionAssigner } from './file-version-assigner';

var path = require('path');

export class FileNameParser {

  fileVersionAssigner: FileVersionAssigner;

  constructor () {
    this.fileVersionAssigner = new FileVersionAssigner();
  }

  parse = (files: string[]) => {
    var parsedFiles : FileInfo[] = []; 

    for (let filePath of files) {
      var fileName = path.basename(filePath);
      var indexOfExtensionStart = fileName.lastIndexOf(".");
      var fileInfo : FileInfo = { 
        path: path.dirname(filePath),
        fileName: fileName.substr(0, indexOfExtensionStart),
        extension: fileName.substr(indexOfExtensionStart + 1, fileName.length - 1),
        originalFileName: fileName,
        versionedFileName: ''
      }    

      fileInfo = this.fileVersionAssigner.assignVersion(fileInfo);

      parsedFiles.push(fileInfo);
    }

    return parsedFiles;
  }

}