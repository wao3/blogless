import { Injectable } from '@nestjs/common';
import { CloudBase } from '@cloudbase/node-sdk/lib/cloudbase';
import { CollectionReference } from '@cloudbase/database';
import { getTcbApp } from '@/utils';

@Injectable()
export class TcbService {
  app: CloudBase = getTcbApp();

  get db() {
    return this.app.database();
  }

  collection(collection: string): CollectionReference {
    return this.db.collection(collection);
  }
}