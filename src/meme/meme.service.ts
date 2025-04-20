import { Injectable } from '@nestjs/common';
import { CreateMemeDto } from './dto/create-meme.dto';
import { UpdateMemeDto } from './dto/update-meme.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meme } from './entities/meme.entity';

@Injectable()
export class MemeService {
  constructor(
    @InjectRepository(Meme)
    private memeRepository: Repository<Meme>,
  ) {}

  create(createMemeDto: CreateMemeDto) {
    return 'This action adds a new meme';
  }

  async findAll() {
    return await this.memeRepository.find();
  }

  async findOne(id: number) {
    return await this.memeRepository.findOneBy({ id });
  }

  async update(id: number, updateMemeDto: UpdateMemeDto) {
    return await this.memeRepository.update(id, {
      properties: updateMemeDto.properties,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} meme`;
  }
}
