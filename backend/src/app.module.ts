import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@/modules/auth/auth.module'
import { BlogModule } from '@/modules/blog/blog.module';
import { SettingModule } from './modules/setting/setting.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [
    AuthModule, 
    BlogModule,
    SettingModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
