import { S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileType } from '@repo/ui/enums/file';

@Injectable()
export class S3Service {
  constructor(private readonly configService: ConfigService) {}

  async upload(file: Express.Multer.File, path: FileType) {
    const { originalname, mimetype } = file;
    const bucket = this.configService.getOrThrow<string>('AWS_S3_BUCKET');
    const region = this.configService.getOrThrow<string>('AWS_REGION');
    const s3 = this.getClient();

    const params = {
      Bucket: bucket + '/' + path,
      Key: new Date().getTime() + '-' + originalname.replace(' ', '-'),
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: region,
      },
    };

    return await s3.upload(params).promise();
  }

  getClient() {
    const accessKeyId =
      this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.getOrThrow<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    return new S3({
      accessKeyId,
      secretAccessKey,
    });
  }

  async get(key: string) {
    const bucket = this.configService.getOrThrow<string>('AWS_S3_BUCKET');
    const s3 = this.getClient();
    const params = { Bucket: bucket, Key: key };
    const blob = await s3.getObject(params).promise();
    return blob;
  }

  async delete(key: string) {
    const bucket = this.configService.getOrThrow<string>('AWS_S3_BUCKET');
    const s3 = this.getClient();
    const params: S3.Types.DeleteObjectRequest = {
      Bucket: bucket,
      Key: key,
    };
    return await s3.deleteObject(params).promise();
  }
}
