import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Validator } from 'class-validator';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CatsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCatDto: Prisma.CatCreateInput) {
    return this.databaseService.cat.create({ data: createCatDto });
  }

  async findAll(size?: 'Large' | 'Medium' | 'Small') {
    if (size) return this.databaseService.cat.findMany({ where: { size } });

    return this.databaseService.cat.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.cat.findUnique({ where: { id } });
  }

  async update(id: number, updateCatDto: Prisma.CatUpdateInput) {
    return this.databaseService.cat.update({
      where: { id },
      data: updateCatDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.cat.delete({ where: { id } });
  }
}
