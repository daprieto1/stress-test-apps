var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    childProcess = require('child_process'),
    morgan = require('morgan'),
    Promise = require('promise');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, access_token');
    next();
});


var port = process.env.PORT || 8080;

var router = express.Router();

var EXECUTE_TEST_COMMAND = 'cd ${body.testProjectPath} && dir && ${body.gradlewPath} gatling-${body.testPath}';
var UPDATE_REPOSITORY_COMMAND = 'cd ${body.testProjectPath} && git checkout -- . && git pull origin master'

var executeCommand = command => {
    return new Promise((resolve, reject) => {
        console.log('command to execute: ' + command);
        childProcess.exec(command,
            (err, stdout, stderr) => {
                if (err) {
                    console.log('err: ' + err);
                    reject(err);
                } else {
                    console.log('stdout: ' + stdout);
                    resolve(stdout);
                }
            }
        );
    });
};

router.post('/execute-test', (req, res) => {
    var body = req.body;
    var command = EXECUTE_TEST_COMMAND;

    body.settings.forEach((setting) => {
        command += ` ${setting.name}=${setting.value}`;
    });

    command = eval('`' + command + '`');
    executeCommand(command)
        .then(() => {
            res.send({ res: command });
        });
});

router.put('/update-code', (req, res) => {
    var body = req.body;
    var command = UPDATE_REPOSITORY_COMMAND;

    command = eval('`' + command + '`');
    executeCommand(command)
        .then(() => {
            res.send({ res: command });
        });

});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);