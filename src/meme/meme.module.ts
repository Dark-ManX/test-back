import { Module } from '@nestjs/common';
import { MemeService } from './meme.service';
import { MemeController } from './meme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meme } from './entities/meme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meme])],
  controllers: [MemeController],
  providers: [MemeService],
})
export class MemeModule {}
