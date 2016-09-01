import { CssFileRetriever } from './css-file-retriever';
import { FileNameParser } from './filename-parser';
import { FileWriter } from './file-writer';
import { FileRenamer } from './file-renamer';
import { StringInstanceReplacer} from './string-instance-replacer';

export class CssVersioner {
  
  cssFileRetriever: CssFileRetriever;
  fileNameParser: FileNameParser;
  fileWriter: FileWriter;
  fileRenamer: FileRenamer;
  stringInstanceReplacer: StringInstanceReplacer;

  parsedCssFiles;
  fileContents;

  assetReferencingFile = 'src/test/index.html';

  constructor() {
    this.cssFileRetriever = new CssFileRetriever();    
    this.fileNameParser = new FileNameParser();    
    this.fileWriter = new FileWriter();
    this.fileRenamer = new FileRenamer();
    this.stringInstanceReplacer = new StringInstanceReplacer();
  }

  version = () => {
    return new Promise((fulfill, reject) => {      
      this.cssFileRetriever.retrieve('**/*.css')
        .then((files: string[]) => {    
          this.parsedCssFiles = this.fileNameParser.parse(files);      
          return this.stringInstanceReplacer.replaceInstances(this.assetReferencingFile, this.parsedCssFiles);                                          
        })
        .then((fileContents) => {
          this.fileContents = fileContents;
          return this.fileWriter.write(this.assetReferencingFile, fileContents);             
        })
        .then(() => {
          var actions = this.parsedCssFiles.map(this.fileRenamer.rename);
          var results = Promise.all(actions);

          results.then(data => {
            console.log(data)
            fulfill(this.fileContents);
          });             
        });      
    });    
  }
}