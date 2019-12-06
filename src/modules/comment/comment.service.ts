import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { CommentDto } from './comment.dto';
import { User } from '../user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) { }

  async storePostComment(id: number, user: User, data: CommentDto) {
    return await this.commentRepository.save({
      user,
      ...data,
      post: { id },
    });
  }

  async update(id: number, data: CommentDto) {
    return await this.commentRepository.update(id, data);
  }

  async destroy(id: number) {
    return await this.commentRepository.delete(id);
  }
}
