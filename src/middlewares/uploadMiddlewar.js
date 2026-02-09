import multer from "multer";



const storage = multer.diskStorage(
    {
        destination: function (req, file, cb){
            // console.log(dirname)
            cb(null, "uploads")
        },
        filename: function(req, file, cb){
            const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
            console.log(file)

            // const originalName = 
            // console.log(ext)
            cb(null, uniqueName+"-"+file.originalname)
        }
    }
)



const upload = multer({
    storage,
    limits: {
        fileSize: 1* 1024 *1024  // 1MB
    }
})


export default upload;