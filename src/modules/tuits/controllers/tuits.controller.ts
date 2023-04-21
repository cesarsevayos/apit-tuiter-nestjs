import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { TuitsService } from '../services/tuits.service';
import { Tuit } from '../entitys/tuit.entity';
import { CreateTuitDto, PaginationQueryDto, UpdateTuitDto } from '../dto';

@Controller('tuits')
export class TuitsController {
  constructor(private readonly tuitsService: TuitsService) {}

  @Get()
  getTuits(): Promise<Tuit[]> {
    console.log(`Peticion GET Solicitando todos los Tuits`);
    return this.tuitsService.getTuits();
  }

  @Get('/pagination')
  getTuitsPagination(@Query() pagination: PaginationQueryDto): Promise<Tuit[]> {
    console.log(`Peticion GET Solicitando todos los Tuits`);
    return this.tuitsService.getTuitsPagination(pagination);
  }

  @Get(':id')
  getTuit(@Param('id') id: number): Promise<Tuit> {
    console.log(`Peticion GET Solicitando Tuit con ID: ${id}`);
    return this.tuitsService.getTuit(id);
  }

  @Post()
  createTuit(@Body() body: CreateTuitDto): Promise<Tuit> {
    console.log(`Peticion POST Solicitando crear Tuit con body: ${body}`);
    return this.tuitsService.cretateTuit(body);
  }

  @Patch(':id')
  updateTuit(
    @Param('id') id: number,
    @Body() tuit: UpdateTuitDto,
  ): Promise<Tuit> {
    console.log(`Peticion PATCH Solicitando actualizar Tuit con id ${id}`);
    return this.tuitsService.updateTuit(id, tuit);
  }

  @Delete(':id')
  deleteTuit(@Param('id') id: number): Promise<Tuit> {
    console.log(`Peticion DELETE Solicitando eliminar Tuit con id ${id}`);
    return this.tuitsService.removeTuit(id);
  }
}
