import multer from 'multer'

const imageupload = multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,'Uploads/')
    },
    filename:function(req,file,cb)
    {
        cb(null,Date.now() + '-' + file.originalname)}
})
const Upload = multer({storage:imageupload})
export  default Upload