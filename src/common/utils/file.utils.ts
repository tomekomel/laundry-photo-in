import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const photoFileName = (req, file: Express.Multer.File, callback) => {
  const [name,] = file.originalname.split('.');
  const fileExtention = extname(file.originalname);
  const randomName = uuid().substring(0, 8);
  callback(null, `${name}-${randomName}${fileExtention}`);
};
