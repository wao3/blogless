import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Module } from '@nestjs/common';
import { TcbService } from '@/services';

@Module({
  providers: [
    CommentService,
    TcbService
  ],
  controllers: [ CommentController ]
})
export class CommentModule {}