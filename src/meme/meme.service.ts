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

  findAll() {
    return this.memeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} meme`;
  }

  update(id: number, updateMemeDto: UpdateMemeDto) {
    return `This action updates a #${id} meme`;
  }

  remove(id: number) {
    return `This action removes a #${id} meme`;
  }
}
