const fs = require('fs-extra');

// Async with promises:
fs.copy('E:\\test', 'C:\\Users\\DiegoPT\\Downloads')
    .then(() => console.log('success!'))
    .catch(err => console.error(err))