import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    // TypeOrmModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     name: 'wollybee-db',
    //     type: 'postgres',
    //     host: configService.get<string>('DATABASE_HOST'),
    //     port: configService.get<number>('DATABASE_PORT'),
    //     username: configService.get<string>('DATABASE_USERNAME'),
    //     password: configService.get<string>('DATABASE_PASSWORD'),
    //     database: configService.get<string>('DATABASE_NAME'),
    //     entities: ['dist/**/*.entity{.ts,.js}'],
    //     synchronize:
    //       configService.get<Environment>('NODE_ENV') === Environment.Local,
    //     logging: true,
    //     logger:
    //       configService.get<Environment>('NODE_ENV') === Environment.Local
    //         ? 'advanced-console'
    //         : 'debug',
    //     ssl: {
    //       rejectUnauthorized: true,
    //       ca: readFileSync('./ap-south-1-bundle.pem'),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
