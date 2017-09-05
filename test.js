const fs = require('fs')
const a = JSON.parse(fs.readFileSync('./dump.2.json').toString());
const b = JSON.parse(fs.readFileSync('./dump.json').toString());

const keys = (Object.keys(a))
const keysB = (Object.keys(b));

for (const k of keys) {
    const part = a[k];
    const bpart = b[k];
    for (var i = 0; i < part.length; i++) {
        let ae = part[i];
        let be = bpart[i];
        console.log(ae)
        console.log(be)
        console.log()
    }
    break
}

const crypto = require('crypto')

