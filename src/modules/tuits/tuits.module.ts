import { Module } from '@nestjs/common';
import { TuitsController } from './controllers/tuits.controller';
import { TuitsService } from './services/tuits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tuit } from './entitys/tuit.entity';
import { User } from '../users/entitys/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tuit, User])],
  controllers: [TuitsController],
  providers: [TuitsService],
})
export class TuitsModule {}
