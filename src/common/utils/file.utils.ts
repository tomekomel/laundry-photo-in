import { extname } from 'path';
import v4 from 'uuid';

export const photoFileName = (req, file, callback) => {
  const [,name] = file.originalname.split('.');
  const fileExtention = extname(file.originalname);
  const randomName = v4().substring(0, 8);
  callback(null, `${name}${randomName}${fileExtention}`);
};
