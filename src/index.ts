import { FileReader } from './services/file-reader';

export class AngularTwoVersioner {
    
  fileReader: FileReader;

  constructor () {
    this.fileReader = new FileReader();
  }  

  version = () => {
    console.log('versioning');

    this.fileReader.readFile('src/test/index.html').then((data) => {
      console.log(data);
      process.exit();
    });    
  }

} 