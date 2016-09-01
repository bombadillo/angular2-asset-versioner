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
        return this.versioner.version('**/*.js');
      }).then(() => {
        console.log('\n 😊 done 😊');
        process.exit();        
      });    
  }

} 