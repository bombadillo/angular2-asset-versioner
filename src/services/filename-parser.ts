import { FileInfo } from '../models/file-info';

var path = require('path');

export class FileNameParser {

    parse = (files: string[]) => {
      var parsedFiles : FileInfo[] = []; 

      for (let filePath of files) {
        var fileName = path.basename(filePath);
        var indexOfExtensionStart = fileName.lastIndexOf(".");
        var fileInfo : FileInfo = { 
          path: filePath,
          fileName: fileName.substr(0, indexOfExtensionStart),
          extension: fileName.substr(indexOfExtensionStart + 1, fileName.length - 1),
          originalFileName: fileName,
          versionedFileName: ''
        }    

        parsedFiles.push(fileInfo);
      }

      return parsedFiles;
    }

}