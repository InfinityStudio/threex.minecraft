const fs = require('fs')

module.exports = function read(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(err);
            else resolve(data.toString('base64'));
        });
    });
}