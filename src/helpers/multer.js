const multer = require('multer');
const mimetype = require('mime-types');


const createStorage = (path) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path)
        },
        filename: (req, file, cb) => {
            const ext = mimetype.extension(file.mimetype);
            if(ext == 'png' || 'jpeg'){
                cb(null, `${file.fieldname}${Date.now()}.${ext}`)
            }else{
                const fileError = new Error("El formato no es aceptado");
                cb(fileError, null);
            }
        }
    });
    return storage;
}

module.exports = createStorage;

