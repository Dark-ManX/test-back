import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemeModule } from './meme/meme.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgresql',
      // host: process.env.DB_HOST,
      // port: +process.env.DB_PORT,
      // username: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB,
      url: process.env.DB_URL,
      autoLoadEntities: true,
    }),
    MemeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
