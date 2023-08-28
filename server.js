const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/execute', (req, res) => {
    const userCommand = req.body.command;

    exec(userCommand, (error, stdout, stderr) => {
        if (error) {
            return res.send(`Error: ${error.message}`);
        }
        if (stderr) {
            return res.send(`Stderr: ${stderr}`);
        }
        res.send(`Output: ${stdout}`);
    });
});

app.post('/executeCheckWords', (req, res) => {
    const userCommand = req.body.command;

    if (/(date|ping|uptime)/.test(userCommand)) { // only allow commands that contain date, ping, uptime
        exec(userCommand, (error, stdout, stderr) => {
            if (error) {
                return res.send(`Error: ${error.message}`);
            }
            if (stderr) {
                return res.send(`Stderr: ${stderr}`);
            }
            res.send(`Output: ${stdout}`);
        });
    } else {
        res.send('Command not allowed.');
    }
});

app.post('/executeCheckChars', (req, res) => {
    const userCommand = req.body.command;

    if (/[&|;$<`\\!"'()]/.test(userCommand)) { // filters & |  ; $ < ` \ ! ' " ( )
        return res.send('Command injection detected.');
    }


    exec(userCommand, (error, stdout, stderr) => {
        if (error) {
            return res.send(`Error: ${error.message}`);
        }
        if (stderr) {
            return res.send(`Stderr: ${stderr}`);
        }
        res.send(`Output: ${stdout}`);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
