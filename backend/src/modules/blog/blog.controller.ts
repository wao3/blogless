import {
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Patch,
  // Request,
  UseGuards,
  Controller,
  // HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDTO } from './blog.dto'
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard'

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

  @UseGuards(JwtAuthGuard)
  @Post()
  async addOne(@Body() body: BlogDTO) {
    return await this.blogService.addOne(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() blog: BlogDTO) {
    return await this.blogService.updateOne(id, blog);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.blogService.deleteOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteMany(@Body('ids') ids: string[]) {
    return await this.blogService.deleteMany(ids);
  }
}