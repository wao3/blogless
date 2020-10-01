import {
  Post,
  Body,
  Get,
  // Query,
  Param,
  // Delete,
  // Patch,
  // Request,
  // UseGuards,
  Controller,
  // HttpCode,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDTO } from './blog.dto'

@Controller('blog')
export class BlogController {
  constructor(readonly blogService: BlogService) {}
  
  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.blogService.getOne(id);
  }

  @Post()
  async addOne(@Body() body: BlogDTO) {
    return await this.blogService.addOne(body);
  }
}