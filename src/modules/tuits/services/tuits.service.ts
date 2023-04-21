import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Tuit } from '../entitys/tuit.entity';
import { CreateTuitDto, PaginationQueryDto, UpdateTuitDto } from '../dto';
import { User } from 'src/modules/users/entitys/user.entity';

@Injectable()
export class TuitsService {
  constructor(
    @InjectRepository(Tuit)
    private readonly tuitRepository: Repository<Tuit>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getTuits(): Promise<Tuit[]> {
    return await this.tuitRepository.find({ relations: ['user'] });
  }

  async getTuitsPagination({
    limit,
    offset,
  }: PaginationQueryDto): Promise<Tuit[]> {
    return await this.tuitRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
    });
  }

  async getTuit(id: number): Promise<Tuit> {
    const tuit: Tuit = await this.tuitRepository.findOneBy({ id: id });
    console.log(tuit);
    if (!tuit) {
      throw new NotFoundException('Id no encontrado');
    }
    return tuit;
  }

  async cretateTuit({ message, user }: CreateTuitDto): Promise<Tuit> {
    const tuit: Tuit = this.tuitRepository.create({ message, user });
    return await this.tuitRepository.save(tuit);
  }

  async updateTuit(id: number, { message }: UpdateTuitDto): Promise<Tuit> {
    const tuit: Tuit = await this.tuitRepository.preload({
      id,
      message,
    });
    if (!tuit) {
      throw new NotFoundException('Resource not found');
    }

    tuit.message = message;
    return tuit;
  }

  async removeTuit(id: number): Promise<Tuit> {
    const tuit: Tuit = await this.tuitRepository.findOneBy({ id: id });

    if (!tuit) {
      throw new NotFoundException('Resource not found');
    }
    return await this.tuitRepository.remove(tuit);
  }
}
