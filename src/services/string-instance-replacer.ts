import { FileReader } from './file-reader';
import { AssetNameReplacer } from './asset-name-replacer';

export class StringInstanceReplacer {

  fileReader: FileReader;
  assetNameReplacer: AssetNameReplacer;

  constructor() {
    this.fileReader = new FileReader();
    this.assetNameReplacer = new AssetNameReplacer();
  }

  replaceInstances = (fileToModify, files) => {    
    return new Promise((fulfill, reject) => {
      this.fileReader.readFile(fileToModify)
        .then((fileContents: string) => {
          for (let file of files) {
            fileContents = this.assetNameReplacer.replace(
              fileContents, 
              file.originalFileName, 
              file.versionedFileName
            );
          }    

          fulfill(fileContents);
        });
    });
  }  
}