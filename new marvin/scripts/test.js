//useful for mounting pages
require('jsdom-global/register')

// const babel_register = require('babel-register')

// setting the url for the environment: to change at build time
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// requiring Mocha files and other tools to iterate into the folder
var Mocha = require('mocha'),
    fs = require('fs-extra'),
    path = require('path');

var mocha = new Mocha({
    reporter: 'nyan', //put 'nyan' and see
    useColors: true,
    require: require('babel-register')()
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

// function to recursively and parallely look for spec.js files into the 'dir' folder
// var walk = function (dir) {
//     var results = [];
//     fs.readdir(dir, function (err, list) {
//         if(err) return
//         var pending = list.length;
//         if(!pending) return true
//         list
//             .forEach(function (file) {
//                 if(file.substr(-8) === '.test.js') {
//                     console.log(file) //it will list all tests files
//                     mocha.addFile(
//                         path.join(dir, file)
//                     );
//                 }
//                 file = path.join(dir, file);
//                 fs.stat(file, function (err, stat) {
//                     if(stat && stat.isDirectory() && stat === 'node_modules') return
//                     if(stat && stat.isDirectory()) {
//                         walk(file, function (err, res) {
//                             results = results.concat(res);
//                             if(!--pending) return
//                         });
//                     } else {
//                         results.push(file);
//                         if(!--pending) return;
//                     }
//                 });
//             });
//     });
// };

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
                        // results.push(file);
                        if(file.substr(-8) === '.test.js') {
                            console.log(file) //it will list all tests files
                            mocha.addFile(file
                                //path.join(dir, file)
                            );
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
    .catch(err => console.log(err))
//mocha.addFile('./src/components/__tests__/LoginButton.test.js')
// // Run the tests.