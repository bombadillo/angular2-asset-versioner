import { Config } from './config';

var glob = require('glob');

export class FileRetriever {

  config: Config;

  constructor () {
    this.config = new Config();
  }

  retrieve = (path) => {    
    var options = {ignore: ['node_modules/**']}; 
    options.ignore = options.ignore.concat(this.config.options.excludeFiles);

    return new Promise((fulfill, reject) => {
      glob(path, options, function (er, files) {
        if (er) {
          console.log('err')
          reject();
        } else {
          fulfill(files);
        }
      });
    });    
  }  
}