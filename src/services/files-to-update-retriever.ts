import { FileRetriever } from './file-retriever';

export class FilesToUpdateRetriever {

  fileRetriever: FileRetriever;

  constructor() {
    this.fileRetriever = new FileRetriever();
  }

  retrieve = () => {
    return new Promise((fulfill, reject) => {
      var files : string[] = [];
      this.fileRetriever.retrieve('**/*.component.ts')
        .then((componentFiles: string[]) => {
          files = files.concat(componentFiles);
          return this.fileRetriever.retrieve('**/*.html');
        })
        .then((htmlFiles: string[]) => {
          files = files.concat(htmlFiles);
          fulfill(files);
        });
    });
  }
}