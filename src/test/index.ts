import { AngularTwoVersioner } from '../index';

var options = {
  excludeFiles: ["bundle.js"]
};

new AngularTwoVersioner(options).version();

