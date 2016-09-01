import { FileReader } from './file-reader';
import { FileWriter } from './file-writer';
import { AssetNameReplacer } from './asset-name-replacer';

export class StringInstanceReplacer {

  fileReader: FileReader;
  fileWriter: FileWriter;
  assetNameReplacer: AssetNameReplacer;

  filesToReplace;

  constructor() {
    this.fileReader = new FileReader();
    this.fileWriter = new FileWriter();
    this.assetNameReplacer = new AssetNameReplacer();
  }

  replaceInstances = (files) => {
    this.filesToReplace = files;
    var filesToReplace = ['src/test/index.html', 'src/test/app/app.component.ts'];
    return new Promise((fulfill, reject) => {
      var actions = filesToReplace.map(this.replaceInstance);
      var results = Promise.all(actions);

      results.then(data => {
        console.log('updated files');
        fulfill(data);
      });       
    });      
  }

  replaceInstance = (fileToModify) => {    
    return new Promise((fulfill, reject) => {
      this.fileReader.readFile(fileToModify)
        .then((fileContents: string) => {
          return this.iterateFiles(fileContents);
        })
        .then((fileContents) => {
          console.log(`updating file ${fileToModify}`);
          this.fileWriter.write(fileToModify, fileContents).then(() => {
            fulfill();
          });             
        });
    });
  }  

  iterateFiles = (fileContents) => {
    console.log('iterating files')
    return new Promise((fulfill, reject) => {
      for (let file of this.filesToReplace) {
        fileContents = this.assetNameReplacer.replace(
          fileContents, 
          file.originalFileName, 
          file.versionedFileName
        );
      }    
      fulfill(fileContents);
    });    
  }
}