// const core = require("@actions/core")
// const github = require("@actions/github")
// const exec = require("@actions/exec")
import * as core from "@actions/core";
import * as github from "@actions/github";
import * as exec from "@actions/exec";


try {
    // 'who-to-greet' input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // exec dir command
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
    // exec git command
    let gitOutput = '';
    let gitError = '';
    const gitOptions = {
        listeners: {
            stdout: (data) => {
                gitOutput += data.toString();
            }, 
            stderr: (data) => {
                gitError += data.toString();
            }
        }
    };
    await exec.exec('git', ['clone', 'https://github.com/parthosengupta/TestGithubActions2'], options);
    console.log(gitOutput);
    console.log(gitError);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
} catch(error) {
    console.log("Error caught: ");
    core.setFailed(error.message);
}