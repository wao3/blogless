import {
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Patch,
  // Request,
  // UseGuards,
  Controller,
  // HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDTO } from './blog.dto'

@Controller('blog')
export class BlogController {
  constructor(readonly blogService: BlogService) {}
  
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.blogService.getOne(id);
  }

  @Get()
  async getMany(
    @Query('size', new ParseIntPipe()) size: number, 
    @Query('page', new ParseIntPipe()) page: number) {
    return await this.blogService.getMany(size, page);
  }

  @Post()
  async addOne(@Body() body: BlogDTO) {
    return await this.blogService.addOne(body);
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() blog: BlogDTO) {
    return await this.blogService.updateOne(id, blog);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.blogService.deleteOne(id);
  }

  @Delete()
  async deleteMany(@Body('ids') ids: string[]) {
    return await this.blogService.deleteMany(ids);
  }
}