// setting the url for the environment: to change at build time
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

//useful for mounting pages
var babel = require('babel-register')()

var jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = (new JSDOM(''))
.window;
global.document = document;

// global.document = jsdom
global.navigator = { userAgent: 'node.js' }
global.window = document.defaultView

var exposedProperties = ['window', 'navigator', 'document']

Object.keys(document.defaultView)
  .forEach((property) => {
    if(typeof global[property] === 'undefined') {
      exposedProperties.push(property)
      global[property] = document.defaultView[property]
    }
  })

// const babel_register = require('babel-register')
require.extensions['.css'] = function () { return null }
require.extensions['.jpg'] = function () { return null }
require.extensions['.scss'] = function () { return null }
require.extensions['.gif'] = function () { return null }

// requiring Mocha files and other tools to iterate into the folder
var Mocha = require('mocha'),
  fs = require('fs-extra');
// path = require('path');

var mocha = new Mocha({
  // reporter: 'spec', //put 'nyan' and see
  reporter: 'nyan',
  useColors: true,
  require: babel
});

//this is the folder in which we have to find the test files
var testDir = 'src';

// promise to have a result
function lookingForTests(dir) {
  return new Promise(function (resolve, reject) {
    walk(dir, function (err, data) {
      if(err !== null) return reject(err);
      resolve(data);
    })
  })
}

// function to recursively and sequentially look for test.js files into the 'dir' folder
var walk = function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if(err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if(!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function (err, stat) {
        if(stat && stat.isDirectory() && stat === 'node_modules') next()
        else {
          if(stat && stat.isDirectory()) {
            walk(file, function (err, res) {
              results = results.concat(res);
              next();
            });
          } else {
            if(file.substr(-8) === '.test.js') {
              console.log(file) //it will list all tests files
              mocha.addFile(file);
            }
            next();
          }
        }
      });
    })();
  });
};

// looking for spec files and adding them to mocha
lookingForTests(testDir)
  .then((err, data) => mocha.run(function (failures) {
    process.exitCode = failures ? -1 : 0; // exit with non-zero status if there were failures
  }))
  .catch(err => console.error(err))