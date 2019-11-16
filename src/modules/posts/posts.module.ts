import { Module } from '@nestjs/common';
import { DemoService } from './providers/demo/demo.service'
import { PostsController } from './posts.controller'

@Module({
  providers: [DemoService],
  controllers: [PostsController]
})
export class PostsModule { }
