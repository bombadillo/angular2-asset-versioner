import { CssVersioner } from './services/css-versioner';

export class AngularTwoVersioner {
    
  cssVersioner: CssVersioner;

  constructor () {
    this.cssVersioner = new CssVersioner();
  }  

  version = () => {
    console.log('versioning');

    this.cssVersioner.version()
      .then(() => {
        console.log('😊 done 😊');
        process.exit();
      });    
  }

} 