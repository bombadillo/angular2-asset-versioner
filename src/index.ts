import { Versioner } from './services/versioner';
import { Config } from './services/config';

export class AngularTwoVersioner {
    
  versioner: Versioner;
  config: Config;

  constructor (options?) {
    this.config = new Config(options);
    this.versioner = new Versioner();    
  }  

  version = () => {
    this.versioner.version('**/*.css')
      .then(() => {
        return this.versioner.version('**/*.js');
      }).then(() => {
        console.log('\n 😊 done 😊');
        process.exit();        
      });    
  }

} 