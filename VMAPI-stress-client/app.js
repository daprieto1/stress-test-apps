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

var EXECUTE_TEST_COMMAND = 'cd ${body.testProjectPath} && ${body.gradlewPath} gatling-${body.testPath}';
var UPDATE_REPOSITORY_COMMAND = 'cd ${body.testProjectPath} && git checkout -- . && git pull origin master';

var executeCommand = command => {
    return new Promise((resolve, reject) => {
        console.log('command to execute: ' + command);
        childProcess.exec(command,
            (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(stdout);
                }
            }
        );
    });
};

router.get('/', (req, res) => {
    res.send({ res: 'I am here' });
})

router.post('/execute-test', (req, res) => {
    var body = req.body;
    var command = EXECUTE_TEST_COMMAND;

    body.settings.forEach((setting) => {
        command += ` ${setting.name}=${setting.value}`;
    });

    command = eval('`' + command + '`');
    executeCommand(command)
        .then(gatlingOutput => {
            gatlingOutput = gatlingOutput.split('\n');
            gatlingOutput = gatlingOutput[gatlingOutput.length - 6].split(' ');
            gatlingOutput = gatlingOutput[gatlingOutput.length - 1].split('\\');
            gatlingOutput.pop();
            gatlingOutput = gatlingOutput.join('/');

            console.log("=============>" + gatlingOutput);
            res.send({ res: command });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

router.put('/update-code', (req, res) => {
    var body = req.body;
    var command = UPDATE_REPOSITORY_COMMAND;

    command = eval('`' + command + '`');
    executeCommand(command)
        .then(() => {
            res.send({ res: command });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });

});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);