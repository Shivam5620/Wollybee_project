'use server';

import { endpoints, routes } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { IProductReviewRequestBody } from '@repo/ui/types';
import { revalidatePath } from 'next/cache';
import { FileType } from '@repo/ui/enums/file';
import { S3 } from 'aws-sdk';
import { parseError } from '../../../utils/error-utils';

export async function createReview(payload: IProductReviewRequestBody) {
  try {
    await ax({
      method: 'post',
      url: `${endpoints.productReview}`,
      data: payload,
    });
    revalidatePath(`${routes.productDetail}/${payload.productId}`, 'page');
    return {
      success: true,
      message: 'Review added Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}


export async function uploadFileToS3(formData: FormData) {
    const file = formData.get('file') as File;
    
    const bucket = process.env.AWS_S3_BUCKET;
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const s3 = new S3({
      accessKeyId,
      secretAccessKey,
      region,
    });
  
    const awsFileName = new Date().getTime() + '-' + file.name.replace(' ', '-');
  
    // Convert File to Buffer
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);
  
    const params = {
      Bucket: `${bucket}/${FileType.productReview}`,
      Key: awsFileName,
      Body: fileBuffer,
      ACL: 'public-read',
      ContentType: file.type,
      ContentDisposition: 'inline',
    };
  
    try {
      const res = await s3.upload(params).promise();
      return {mediaUrls : res.Location, mediaKeys: `${bucket}/${awsFileName}`};
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Error uploading file to S3, ' + error);
    }
  }
