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
    console.log(this.memeService.findAll());
    return await this.memeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemeDto: UpdateMemeDto) {
    return this.memeService.update(+id, updateMemeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memeService.remove(+id);
  }
}
