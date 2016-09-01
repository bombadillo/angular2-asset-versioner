import { FileReader } from './file-reader';
import { CssFileRetriever } from './css-file-retriever';
import { FileNameParser } from './filename-parser';
import { AssetNameReplacer } from './asset-name-replacer';

export class CssVersioner {

  fileReader: FileReader;
  cssFileRetriever: CssFileRetriever;
  fileNameParser: FileNameParser;
  assetNameReplacer: AssetNameReplacer;

  constructor() {
    this.fileReader = new FileReader();
    this.cssFileRetriever = new CssFileRetriever();    
    this.fileNameParser = new FileNameParser();
    this.assetNameReplacer = new AssetNameReplacer();
  }

  version = () => {
    return new Promise((fulfill, reject) => {
      this.cssFileRetriever.retrieve('**/*.css').then((files: string[]) => {
        var parsedCssFiles = this.fileNameParser.parse(files);     

        this.fileReader.readFile('src/test/index.html').then((fileContents: string) => {
          for (let cssFile of parsedCssFiles) {
            fileContents = this.assetNameReplacer.replace(fileContents, cssFile.originalFileName, 'blerg');
          }         

          fulfill(fileContents);                  
        });      
      });
    });    
  }
}