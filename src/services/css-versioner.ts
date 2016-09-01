import { FileReader } from './file-reader';
import { CssFileRetriever } from './css-file-retriever';
import { FileNameParser } from './filename-parser';
import { AssetNameReplacer } from './asset-name-replacer';
import { FileWriter } from './file-writer';
import { FileRenamer } from './file-renamer';

export class CssVersioner {

  fileReader: FileReader;
  cssFileRetriever: CssFileRetriever;
  fileNameParser: FileNameParser;
  assetNameReplacer: AssetNameReplacer;
  fileWriter: FileWriter;
  fileRenamer: FileRenamer;

  constructor() {
    this.fileReader = new FileReader();
    this.cssFileRetriever = new CssFileRetriever();    
    this.fileNameParser = new FileNameParser();
    this.assetNameReplacer = new AssetNameReplacer();
    this.fileWriter = new FileWriter();
    this.fileRenamer = new FileRenamer();
  }

  version = () => {
    return new Promise((fulfill, reject) => {
      var assetReferencingFile = 'src/test/index.html';
      this.cssFileRetriever.retrieve('**/*.css')
        .then((files: string[]) => {
          var parsedCssFiles = this.fileNameParser.parse(files);     

          this.fileReader.readFile(assetReferencingFile)
            .then((fileContents: string) => {
              for (let cssFile of parsedCssFiles) {
                fileContents = this.assetNameReplacer.replace(
                  fileContents, 
                  cssFile.originalFileName, 
                  cssFile.versionedFileName
                );
              }         

              this.fileWriter.write(assetReferencingFile, fileContents)
                .then(() => {
                  var actions = parsedCssFiles.map(this.fileRenamer.rename);
                  var results = Promise.all(actions);

                  results.then(data => {
                    console.log(data)
                    fulfill(fileContents);
                  });                                                      
                });                            
            });      
        });
    });    
  }
}