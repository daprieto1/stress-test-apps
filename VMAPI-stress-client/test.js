
const { spawn } = require('child_process');

var spawnCommand = command => {
    const child = spawn(command);

    child.stdout.on('data', chunk => {
        console.log(chunk)
    });

    child.on('close', code => {
        console.log(`child process exited with code ${code}`);
    });

    child.on('error', error => {
        console.log(error);
    });
};

try {
    spawnCommand('cd E:/dv/RNF/scenarios/gatling-gradle && gradlew gatling-com.bizagi.simulations.bpmengine._10_8.TravelRequest108FirstActivityNext -Dhost=http://40.71.215.23/BizagiBPM/ -Dsteps=atOnceUsers:1u');
} catch (e) {
    console.log('HP');
}
