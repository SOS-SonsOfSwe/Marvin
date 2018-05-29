// setting the url for the environment: to change at build time
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// requiring Mocha files and other tools to iterate into the folder
var Mocha = require('mocha'),
    fs = require('fs-extra'),
    path = require('path');

var mocha = new Mocha({
    reporter: 'spec', //put 'nyan' and see
    useColors: true,
    require: 'babel-register'
});

//this is the folder in which we have to find the test files
var testDir = 'src';

// function to recursively and parallely look for spec.js files into the 'dir' folder
var lookingForTest = function (dir) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if(err) return
        var pending = list.length;
        if(!pending) return
        list
            .forEach(function (file) {
                if(file.substr(-8) === '.test.js') {
                    console.log(file) //it will list all tests files
                    mocha.addFile(
                        path.join(dir, file)
                    );
                }
                file = path.resolve(dir, file);
                fs.stat(file, function (err, stat) {
                    if(stat && stat.isDirectory()) {
                        lookingForTest(file, function (err, res) {
                            results = results.concat(res);
                            if(!--pending) return
                        });
                    } else {
                        results.push(file);
                        if(!--pending) return;
                    }
                });
            });
    });
};
// looking for spec files and adding them to mocha
lookingForTest(testDir)

// Run the tests.
mocha.run(function (failures) {
    process.exitCode = failures ? -1 : 0; // exit with non-zero status if there were failures
});