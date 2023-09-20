const { exec } = require(`child_process`);
const fs = require(`fs`);
const path = require(`path`);
const chalk = require(`chalk`);

const command = process.argv[2];

if ([`develop`].includes(command)) {
    console.log(`[othus] othus-scripts: ${command}`);

    if (command === `develop`) {
        console.log(`\n[othus-scripts] ts => js`);

        console.log(`npx babel ${process.cwd()}\\src --out-dir ${process.cwd()}\\.static`);
        exec(`npx babel ${process.cwd()}\\src --out-dir ${process.cwd()}\\.static`, { cwd: __dirname }, (error, stdout, stderr) => {
            console.log(stdout);
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