import { Injectable } from '@nestjs/common';
import { Post } from 'src/modules/posts/interfaces/post.interface';

@Injectable()
export class DemoService {
  private readonly posts: Post[] = [];
  findAll() {
    return this.posts;
  }
  create(post) {
    this.posts.push(post);
  }
}
