import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Prisma } from '@prisma/client';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { NotFoundException } from '@nestjs/common/exceptions';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body(ValidationPipe) createCatDto: Prisma.CatCreateInput) {
    this.catsService.create(createCatDto);
    return createCatDto;
  }

  @Get()
  findAll(@Query('size') size?: 'Large' | 'Medium' | 'Small') {
    return this.catsService.findAll(size);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    return this.catsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe())
    id: number,
    @Body(ValidationPipe) updateCatDto: Prisma.CatUpdateInput,
  ) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  delete(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    return this.catsService.remove(id);
  }
}
