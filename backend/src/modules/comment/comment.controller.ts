import { 
  Body,
  Controller, 
  Get, 
  Param, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ParseIntPipe, 
  Post, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Query,
  Delete,
  Patch, 
  UseGuards,
} from '@nestjs/common';
import { CommentDTO } from './comment.dto';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard'


@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':blogId')
  async getManyByBlogId(
    @Param('blogId') blogId: string, 
    @Query('size', new ParseIntPipe()) size = 10, 
    @Query('page', new ParseIntPipe()) page = 0
    ) {
    return await this.commentService.getManyByBlogId(blogId, size, page);
  }

  @Post(':blogId')
  async addOneByBlogId(@Param('blogId') blogId: string, @Body() comment: CommentDTO) {
    return await this.commentService.addOneByBlogId(blogId, comment);
  }

  @Post(':blogId/:commentId')
  async replyByCommentId(@Param('blogId') blogId: string, @Param('commentId') commentId: string, @Body() comment: CommentDTO) {
    return await this.commentService.replyByCommentId(blogId, commentId, comment);
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  async deleteOneByCommentId(@Param('commentId') commentId: string) {
    return await this.commentService.deleteOneByCommentId(commentId);
  }

  @Patch(':commentId')
  @UseGuards(JwtAuthGuard)
  async changeVisible(@Param('commentId') commentId, @Body('isVisible') isVisible: boolean) {
    return await this.commentService.changeVisible(commentId, isVisible);
  }
}