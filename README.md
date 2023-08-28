# ctf-commandinjection

This app is obviously not secure and not suitable for production environments, etc. It demonstrates basic command injection and some weak defenses that can by bypassed.

Feel free to use this for:
- understanding basic command injection attacks
- testing payloads
- code review practice
- for CTFs (the endpoints are easy to copy & reuse)

## Execute 1

Executes the command

## Execute 2

Checks the input for allowed commands and blocks if one is not found.

## Execute 3

Checks the input for special characters and blocks based on that.

## Setup

```
git clone https://github.com/AppSecExplained/ctf-commandinjection.git
cd ctf-commandinjection
npm install
node server.js
```
Browse to
`http://localhost:3000`

![image](https://github.com/AppSecExplained/ctf-commandinjection/assets/36963270/ffa0b969-d174-47dd-b3d3-1b16827be7b6)
