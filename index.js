const core = require("@actions/core")
const github = require("@actions/github")
const exec = require("@actions/exec")

try {
    // 'who-to-greet' input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // exec dir command
    (async () => {
        let dirOutput = '';
        let dirError = '';
        const options = {
            listeners: {
                stdout: (data) => {
                    dirOutput += data.toString();
                }, 
                stderr: (data) => {
                    dirError += data.toString();
                }
            }
        };
        await exec.exec('dir', [], options);
        console.log(dirOutput);
        console.log(dirError);
    })();
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
} catch(error) {
    core.setFailed(error.message);
}