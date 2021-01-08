const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const fs = require('fs')
const fsExtra = require('fs-extra')
const AdmZip = require('adm-zip');

app.use(cors())

const multer = require('multer');
const upload = multer({
    dest: 'uploads/' // this saves your file into a directory called "uploads"
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', upload.single('file-to-upload'), (req, res) => {
    const name = req.file.filename
    fsExtra.emptyDir('./json');
    fs.rename('./uploads/' + name, './json/config.zip', function (err) {
        if (err) console.log('ERROR: ' + err);
    });
    fsExtra.emptyDir('./uploads');
    const zip = new AdmZip('./json/config.zip');
    zip.extractAllTo('./json/', true);
    res.redirect('http://localhost:3000')
});

app.use(express.static('json'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})