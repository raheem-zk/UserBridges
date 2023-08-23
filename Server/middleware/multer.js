
import multer from 'multer';
import path from 'path';

//multer handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/userprofile'))
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
})
const upload = multer({ storage: storage })


export default upload;