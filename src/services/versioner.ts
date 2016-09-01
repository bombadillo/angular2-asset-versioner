import { FileRetriever } from './file-retriever';
import { FileNameParser } from './filename-parser';
import { FileWriter } from './file-writer';
import { FileRenamer } from './file-renamer';
import { StringInstanceReplacer} from './string-instance-replacer';

export class Versioner {
  
  fileRetriever: FileRetriever;
  fileNameParser: FileNameParser;
  fileWriter: FileWriter;
  fileRenamer: FileRenamer;
  stringInstanceReplacer: StringInstanceReplacer;

  parsedFiles;
  fileContents;

  assetReferencingFile = 'src/test/index.html';

  constructor() {
    this.fileRetriever = new FileRetriever();    
    this.fileNameParser = new FileNameParser();    
    this.fileWriter = new FileWriter();
    this.fileRenamer = new FileRenamer();
    this.stringInstanceReplacer = new StringInstanceReplacer();
  }

  version = (fileSearch) => {
    return new Promise((fulfill, reject) => {      
      this.fileRetriever.retrieve(fileSearch)
        .then((files: string[]) => {    
          this.parsedFiles = this.fileNameParser.parse(files);      
          return this.stringInstanceReplacer.replaceInstances(this.assetReferencingFile, this.parsedFiles);                                          
        })
        .then((fileContents) => {
          this.fileContents = fileContents;
          return this.fileWriter.write(this.assetReferencingFile, fileContents);             
        })
        .then(() => {
          var actions = this.parsedFiles.map(this.fileRenamer.rename);
          var results = Promise.all(actions);

          results.then(data => {
            console.log(data)
            fulfill(this.fileContents);
          });             
        });      
    });    
  }
}