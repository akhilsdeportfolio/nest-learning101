import { Injectable, Logger } from '@nestjs/common';
import app from 'src/firebase/firebase';

@Injectable()
export class UploadService {
  async upload(file: Express.Multer.File) {
    Logger.log('Upload Fle', 'info');
    Logger.log(file, 'info');
    Logger.log(app.name, 'info');

    return file;
  }
}
