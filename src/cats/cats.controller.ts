import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Body,
  Patch,
  Post,
} from '@nestjs/common';
import { Cat } from 'src/schemas/cat.schema';
import { CatsService } from './cats.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { UserData } from 'src/dto/userData.dto';

@Controller('cats')
@UseInterceptors(CacheInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCat(@Body() createCatData: UserData): Promise<{ id: string }> {
    return this.catsService.createCat(createCatData);
  }
  @Get()
  async getCats(): Promise<Cat[]> {
    return this.catsService.getCats();
  }

  @Patch('update/:breed')
  async updateCat(
    @Param('breed') breed,
    @Body() newData: UserData,
  ): Promise<Cat> {
    return this.catsService.updateCat(breed, newData);
  }
}
