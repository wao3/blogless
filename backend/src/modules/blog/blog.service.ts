import { TcbService } from '@/services';
import { Injectable } from '@nestjs/common';
import { CollectionReference, Db } from '@cloudbase/database';
import { BlogDTO } from './blog.dto'
import { RecordExistException, RecordNotExistException, FailedOperation } from '@/common'

@Injectable()
export class BlogService {
  private collection: CollectionReference;
  private db: Db;

  constructor(readonly tcbService: TcbService) {
    this.db = tcbService.db;
    this.collection = tcbService.collection('blogless-blogs');
  }

  async getOne(id: string) {
    const { data: blog } = await this.collection.doc(id).get();
    console.debug(blog);

    if(!blog.length) {
      throw new RecordNotExistException();
    }
    return blog[0];
  }

  async addOne(body: BlogDTO) {
    if(body._id) {
      const { data: blog } = await this.collection.doc(body._id).get();
      if(blog.length) {
        throw new RecordExistException('博客地址已存在，请更换一个');
      }
    }
    
    const now = new this.db.serverDate();
    Object.assign(body, {
      _createTime: now,
      _updateTime: now,
      pageView: 1,
      category: body.category ? body.category : '暂未分类',
    })

    const { id } = await this.collection.add(body)

    if(!id) {
      throw new FailedOperation('新增文章失败，请重试')
    }

    return { id }
  }
}