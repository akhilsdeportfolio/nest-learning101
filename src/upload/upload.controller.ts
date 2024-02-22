import {
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Logger,
  ParseFilePipe,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req: any, file: any, cb: any) => {
        console.log('file', file);
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf)$/)) {
          // Allow storage of file
          cb(null, true);
        } else {
          // Reject file
          cb(
            new HttpException(
              `Unsupported file type ${file.originalname}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
      dest: './upload',
      preservePath: true,
    }),
  )
  async fileUpload(
    @UploadedFile(new ParseFilePipe({}))
    file: Express.Multer.File,
  ) {
    return this.uploadService.upload(file);
  }

  @Get()
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="application.pdf"')
  getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
    Logger.log(res, 'info');
    const file = createReadStream(
      join(process.cwd(), 'upload/d52cb1eaf66bb1b3568264323d5fd826'),
    );
    return new StreamableFile(file);
  }
}
