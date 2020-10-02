import { TcbService } from '@/services';
import { Injectable } from '@nestjs/common';
import { CollectionReference, Db } from '@cloudbase/database';
import { BlogDTO } from './blog.dto'
import { RecordExistException, RecordNotExistException, FailedOperation, BadRequestException } from '@/common'

@Injectable()
export class BlogService {
  private collection: CollectionReference;
  private db: Db;

  constructor(readonly tcbService: TcbService) {
    this.db = tcbService.db;
    this.collection = tcbService.collection('blogless-blogs');
  }

  // 分页查询，size是查询数量， page是查询页码，从0开始
  async getMany(size: number, page: number) {
    if(size < 1 || size > 50) {
      throw new BadRequestException("size范围在1到50之间");
    }
    if(page < 0) {
      throw new BadRequestException("page不能小于0");
    }

    const { data } = await this.collection
    .aggregate()
    .sort({
      _updateTime: -1
    })
    .skip(size * page)
    .limit(size)
    .end();

    return data;
  }

  async getOne(id: string) {
    const { data: blog } = await this.collection.doc(id).get();
    console.debug(blog);

    if(!blog.length) {
      throw new RecordNotExistException();
    }
    return blog[0];
  }

  async addOne(blog: BlogDTO) {
    if(blog._id) {
      const { data: blogExist } = await this.collection.doc(blog._id).get();
      if(blogExist.length) {
        throw new RecordExistException('博客地址已存在，请更换一个');
      }
    }
    
    const now = new this.db.serverDate();
    Object.assign(blog, {
      _createTime: now,
      _updateTime: now,
      pageView: 1,
      category: blog.category ? blog.category : '暂未分类',
      tags: blog?.tags?.length ? blog.tags : [],
    })

    const { id } = await this.collection.add(blog)

    if(!id) {
      throw new FailedOperation('新增文章失败，请重试')
    }

    return { id }
  }

  async updateOne(id: string, blog: BlogDTO) {
    if(!id) {
      throw new RecordNotExistException('文章不存在');
    } 
    const { data: blogExist } = await this.collection.doc(id).get();
    if(!blogExist.length) {
      throw new RecordNotExistException('文章不存在');
    }
    
    Object.assign(blog, {
      _updateTime: new this.db.serverDate(),
    })
    
    const { updated } = await this.collection.doc(id).update(blog);

    if(!updated) {
      throw new FailedOperation('更新文章失败，请重试');
    }

    return { updated };
  }

  async deleteOne(id: string) {
    const { deleted } = await this.collection.doc(id).remove();

    if(!deleted) {
      throw new FailedOperation('删除文章失败，请重试');
    }

    return { deleted };
  }

  async deleteMany(ids: string[]) {
    const _ = this.db.command;

    const { deleted } = await this.collection.where({
      _id: _.in(ids)
    }).remove();

    return { deleted };
  }
}