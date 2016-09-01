import { GuidCreator } from './guid-creator';
import { FileInfo } from '../models/file-info';

export class FileVersionAssigner {

  guidCreator: GuidCreator;  

  constructor() {
    this.guidCreator = new GuidCreator();    
  }

  assignVersion(file: FileInfo) {
    var guid = this.guidCreator.create();    
    file.versionedFileName = `${file.fileName}.${guid}.${file.extension}`;               
    return file;
  }
} 