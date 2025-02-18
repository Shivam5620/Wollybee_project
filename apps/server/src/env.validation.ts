import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
  validateSync,
} from 'class-validator';
import { Environment } from '@repo/ui/enums/environment';

class EnvironmentVariables {
  @IsEnum(Environment)
  @IsNotEmpty()
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_CONNECTION: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  @IsNotEmpty()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_NAME: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET: string;

  @IsString()
  @IsNotEmpty()
  // @IsUrl()
  NEXTAUTH_URL: string;

  @IsString()
  @IsNotEmpty()
  NEXTAUTH_SECRET: string;

  @IsString()
  @IsNotEmpty()
  // @IsUrl()
  BACKEND_URL: string;

  @IsString()
  @IsNotEmpty()
  AWS_S3_BUCKET: string;

  @IsString()
  @IsNotEmpty()
  AWS_REGION: string;

  @IsString()
  @IsNotEmpty()
  AWS_ACCESS_KEY_ID: string;

  @IsString()
  @IsNotEmpty()
  AWS_SECRET_ACCESS_KEY: string;

  @IsString()
  @IsNotEmpty()
  PHONEPE_MERCHANT_ID: string;

  @IsString()
  @IsNotEmpty()
  PHONEPE_PUBLIC_SALT_KEY: string;

  @IsString()
  @IsNotEmpty()
  PHONEPE_KEY_INDEX: string;

  @IsString()
  @IsNotEmpty()
  // @IsUrl()
  PHONEPE_REDIRECT_URL: string;

  @IsString()
  @IsNotEmpty()
  // @IsUrl()
  PHONEPE_CALLBACK_URL: string;

  @IsString()
  @IsNotEmpty()
  // @IsUrl()
  PHONEPE_FAILURE_URL: string;

  @IsString()
  @IsNotEmpty()
  // @IsUrl()
  PHONEPE_API_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
