import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Module } from '@nestjs/common';
import { TcbService } from '@/services'

@Module({
  controllers: [BlogController],
  providers: [BlogService, TcbService]
})
export class BlogModule {}