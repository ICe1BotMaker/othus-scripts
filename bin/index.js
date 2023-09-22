const { exec } = require(`child_process`);
const fs = require(`fs`);
const path = require(`path`);
const chalk = require(`chalk`);

const command = process.argv[2];

if ([`develop`].includes(command)) {
    console.log(`[othus] othus-scripts: ${command}`);

    if (command === `develop`) {
        console.log(`\n[othus-scripts] ts => js`);

        exec(`npx tsc`, { cwd: process.cwd() }, (error, stdout, stderr) => {
            console.log(stdout);

            exec(`npx babel ${process.cwd()}\\.static-js --out-dir ${process.cwd()}\\.static-babel`, { cwd: `${__dirname}\\..\\` }, (error, stdout, stderr) => {
                console.log(stdout);
            });
        });
    }
} else {
    console.log(`[othus] othus-scripts: project ${command}`);

    function copyDirectory(sourceDir, destDir) {
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);

        const files = fs.readdirSync(sourceDir);

        for (const file of files) {
            const sourceFilePath = path.join(sourceDir, file);
            const destFilePath = path.join(destDir, file);
        
            if (fs.statSync(sourceFilePath).isDirectory()) {
                copyDirectory(sourceFilePath, destFilePath);
            } else {
                fs.copyFileSync(sourceFilePath, destFilePath);
            }
        }
    }

    copyDirectory(`${__dirname}\\..\\app-directory`, `./${command}`);

    exec(`npm install`, { cwd: `./${command}` }, (error, stdout, stderr) => {
        console.log(chalk.yellow(stdout));
    });
}