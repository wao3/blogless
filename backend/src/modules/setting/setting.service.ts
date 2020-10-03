import { Injectable } from '@nestjs/common';
import { TcbService } from '@/services'
import { CollectionReference, Db } from '@cloudbase/database'
import { SettingDTO } from './setting.dto';
import { RecordNotExistException } from '@/common';

@Injectable()
export class SettingService {
  private collection: CollectionReference;
  private db: Db;

  constructor(private readonly tcbService: TcbService) {
    this.collection = tcbService.collection('blogless-settings');
    this.db = tcbService.db;
  }

  // 将setting数组转为对象
  private transformSettings(settings: SettingDTO[]) {
    const setting = {};
    for( const s of settings ) {
      setting[s._id] = s.data;
    }
    return setting;
  }

  async getAll() {
    const { data: settings } = await this.collection.get();
    return this.transformSettings(settings);
  }

  async getOne(id: string) {
    const { data: settings } = await this.collection.doc(id).get();
    return this.transformSettings(settings);
  }

  async updateOne(id: string, setting: SettingDTO) {
    const { data } = setting; // 移除 _id 字段
    const { updated } = await this.collection.doc(id).update({ data });

    if(!updated) {
      throw new RecordNotExistException('设置项不存在');
    }

    return { updated }
  }
}