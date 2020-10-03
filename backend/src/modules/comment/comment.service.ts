import { TcbService } from '@/services';
import { Injectable } from '@nestjs/common';
import { CollectionReference, Db } from '@cloudbase/database'
import { CommentDTO } from './comment.dto';
import { FailedOperation, RecordNotExistException } from '@/common';

@Injectable()
export class CommentService {
  private commentCollection: CollectionReference;
  private blogCollection: CollectionReference;
  private db: Db;
  
  constructor(private readonly tcbService: TcbService){
    this.commentCollection = tcbService.collection('blogless-comments');
    this.blogCollection = tcbService.collection('blogless-blogs');
    this.db = tcbService.db;
  }

  async addOneByBlogId(blogId: string, comment: CommentDTO, isAdmin = false) {
    const { data: blog } = await this.blogCollection.doc(blogId).get();

    if(!blog.length) {
      throw new RecordNotExistException('该文章不存在');
    }

    Object.assign(comment, { 
      isAdmin,
      blogId,
      comments: [],
      _createTime: this.db.serverDate(),
      isNested: false,
      isVisible: false,
    });

    const { id } = await this.commentCollection.add(comment);

    if(!id) {
      throw new FailedOperation('评论失败，请重试');
    }

    return { id };
  }

  // 对评论进行回复
  async replyByCommentId(blogId: string, commentId: string, comment: CommentDTO, isAdmin = false) {
    const _ = this.db.command;

    Object.assign(comment, { 
      blogId,
      isAdmin,
      _createTime: this.db.serverDate(),
      isNested: true,
      comments: null,
      isVisible: false,
    });

    const { id } = await this.commentCollection.add(comment);

    if(!id) {
      throw new FailedOperation('评论失败，请重试');
    }

    const { updated } = await this.commentCollection.doc(commentId).update({
      comments: _.push(id),
    })

    if(!updated) {
      throw new FailedOperation('回复失败，请重试');
    }

    return '回复成功';
  }

  async getManyByBlogId(blogId: string, size: number, page: number) {
    const $ = this.db.command.aggregate
    const _ = this.db.command
    const { data } = await this.commentCollection
      .aggregate()
      .match({
        blogId,
        isNested: false,
        isVisible: true,
      })
      .sort({
        _createTime: -1
      })
      .skip(size*page)
      .limit(size)
      // .lookup({
      //   from: 'blogless-comments',
      //   localField: 'comments',
      //   foreignField: '_id',
      //   as: 'comments'
      // })
      .lookup({
        from: 'blogless-comments',
        let: {
          ids: '$comments',
          v: true,
        },
        pipeline: $.pipeline().match(
          _.expr(
              $.and([
                $.in(['$_id', '$$ids']),
                $.eq(['$isVisible', true])
              ])
            )
          ).done(),
        as: 'comments'
      })
      .end();

    return data;
  }

  async deleteOneByCommentId(commentId: string) {
    const { deleted } = await this.commentCollection.doc(commentId).remove();

    if(!deleted) {
      throw new RecordNotExistException('删除失败，请检查文章是否存在');
    }

    return { deleted };
  }

  async changeVisible(commentId: string, isVisible: boolean) {
    const { updated } = await this.commentCollection.doc(commentId).update({
      isVisible
    })

    if(!updated) {
      throw new RecordNotExistException('修改失败，请检查文章是否存在');
    }

    return { updated };
  }
}