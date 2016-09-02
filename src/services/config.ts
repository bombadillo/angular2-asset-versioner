import { Options } from '../models/options';

export class Config {  
  private static config: Config;

  options: Options;  

  constructor(options?) {
    if (!Config.config) {
      Config.config = this;
      this.options = options;
    }
    return Config.config;
  }  
}   
