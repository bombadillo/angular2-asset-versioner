import { FileRetriever } from './file-retriever';
import { FileNameParser } from './filename-parser';
import { FileRenamer } from './file-renamer';
import { StringInstanceReplacer} from './string-instance-replacer';

export class Versioner {
  
  fileRetriever: FileRetriever;
  fileNameParser: FileNameParser;  
  fileRenamer: FileRenamer;
  stringInstanceReplacer: StringInstanceReplacer;

  parsedFiles;

  constructor() {
    this.fileRetriever = new FileRetriever();    
    this.fileNameParser = new FileNameParser();        
    this.fileRenamer = new FileRenamer();
    this.stringInstanceReplacer = new StringInstanceReplacer();
  }

  version = (fileSearch) => {
    return new Promise((fulfill, reject) => {      
      this.fileRetriever.retrieve(fileSearch)
        .then((files: string[]) => {    
          this.parsedFiles = this.fileNameParser.parse(files);      
          return this.stringInstanceReplacer.replaceInstances(this.parsedFiles);                                          
        })
        .then(() => {
          var actions = this.parsedFiles.map(this.fileRenamer.rename);
          var results = Promise.all(actions);

          results.then(data => {
            console.log(data)
            fulfill(true);
          });             
        });      
    });    
  }
}