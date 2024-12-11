import multer, { StorageEngine } from "multer";
import { Request } from "express";
import path, { resolve } from "path";
import fs from 'fs';

const storage: StorageEngine = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    const uploadPath = path.join(__dirname, '../upload');
    if (!fs.existsSync(uploadPath)) 
      fs.mkdirSync(uploadPath);
    cb(null, resolve(uploadPath));
  },

  filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, path.extname(file.originalname));
    const newFileName = `${fileName}_${Date.now()}${ext}`;
    cb(null, newFileName);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const fileTypes = /pdf/; 
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = file.mimetype === 'application/pdf';
  if (extname && mimeType) 
    cb(null, true); 
  else
    cb(new Error('Only PDF files are allowed!'), false);
}

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: fileFilter,
});

export default upload;
