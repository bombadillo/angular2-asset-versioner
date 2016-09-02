import { Options } from '../models/options';

export class Config {  
  private static config: Config;

  options: Options;  

  constructor(options?) {
    console.log('line 9');
    console.log(options)
    if (!Config.config) {
      Config.config = this;
      console.log(options)
      this.options = options;
      console.log(this.options);
    }
    return Config.config;
  }  
}   
