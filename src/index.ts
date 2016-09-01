import { FileReader } from './services/file-reader';
import { CssFileRetriever } from './services/css-file-retriever';
import { FileNameParser } from './services/filename-parser';
import { AssetNameReplacer } from './services/asset-name-replacer';

export class AngularTwoVersioner {
    
  fileReader: FileReader;
  cssFileRetriever: CssFileRetriever;
  fileNameParser: FileNameParser;
  assetNameReplacer: AssetNameReplacer;

  constructor () {
    this.fileReader = new FileReader();
    this.cssFileRetriever = new CssFileRetriever();    
    this.fileNameParser = new FileNameParser();
    this.assetNameReplacer = new AssetNameReplacer();
  }  

  version = () => {
    console.log('versioning');

    this.cssFileRetriever.retrieve('**/*.css').then((files: string[]) => {
      var parsedCssFiles = this.fileNameParser.parse(files);     

      this.fileReader.readFile('src/test/index.html').then((fileContents: string) => {
        for (let cssFile of parsedCssFiles) {
          fileContents = this.assetNameReplacer.replace(fileContents, cssFile.originalFileName, 'blerg');
        }         

        console.log(fileContents);
        console.log('😊 done 😊');
        process.exit();
      });      

    });
  }

} 