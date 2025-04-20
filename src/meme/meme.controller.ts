import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MemeService } from './meme.service';
import { CreateMemeDto } from './dto/create-meme.dto';
import { UpdateMemeDto } from './dto/update-meme.dto';

@Controller('memes')
export class MemeController {
  constructor(private readonly memeService: MemeService) {}

  @Post()
  create(@Body() createMemeDto: CreateMemeDto) {
    return this.memeService.create(createMemeDto);
  }

  @Get()
  async findAll() {
    return await this.memeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.memeService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMemeDto: UpdateMemeDto) {
    console.log(updateMemeDto);
    return await this.memeService.update(+id, updateMemeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memeService.remove(+id);
  }
}
