import { AngularTwoVersioner } from '../index';

var options = {
  excludeFiles: ['bundle.js', 'dist/**/*']
};

new AngularTwoVersioner(options).version();

