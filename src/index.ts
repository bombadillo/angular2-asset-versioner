import { Versioner } from './services/versioner';

export class AngularTwoVersioner {
    
  versioner: Versioner;

  constructor () {
    this.versioner = new Versioner();
  }  

  version = () => {
    console.log('versioning');

    this.versioner.version('**/*.css')
      .then(() => {
        console.log('\n 😊 done 😊');
        process.exit();
      });    
  }

} 