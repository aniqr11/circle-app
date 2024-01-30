import * as multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadImage = multer({ storage: storage });

export default uploadImage;

// import { NextFunction, Request, Response } from "express";
// import * as multer from "multer";

// export default new (class uploadImage {
//   upload = (fieldname: string) => {
//     const storage = multer.diskStorage({
//       destination(req, file, cb) {
//         cb(null, "src/uploads");
//       },
//       filename(req, file, callback) {
//         callback(null, `${file.fieldname}-${Date.now()}.png`);
//       },
//     });

//     const uploadFile = multer({
//       storage: storage,
//     });

//     return (req: Request, res: Response, next: NextFunction) => {
//       uploadFile.single(fieldname)(req, res, (error) => {
//         if (error) res.status(400).json({ message: "error file upload" });
//         res.locals.filename = req.file.filename;
//         next();
//       });
//     };
//   };
// })();
