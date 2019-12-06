import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';
import { ListOptionsInterface } from 'src/core/interfaces/list-options.interface';
import { Tag } from '../tag/tag.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) { }

  async beforeTag(tags: Array<Partial<Tag>>) {
    const ts = tags.map(async item => {
      const { id, name } = item;
      if (id) {
        const t = await this.tagRepository.findOne(id);
        if (t) {
          return t;
        }
        return;
      }

      if (name) {
        const t = await this.tagRepository.findOne({ name });
        if (t) {
          return t;
        }
        return await this.tagRepository.save(item);
      }
    });

    return Promise.all(ts);
  }

  async store(data: PostDto, user: User) {
    const { tags } = data;
    if (tags) {
      data.tags = await this.beforeTag(tags);
    }

    const entity = await this.postRepository.create(data);
    await this.postRepository.save({
      ...entity,
      user,
    });
    return entity;
  }

  async index(options: ListOptionsInterface) {
    const { categories } = options;
    const q = await this.postRepository.createQueryBuilder('post');
    q.leftJoinAndSelect('post.user', 'user');
    q.leftJoinAndSelect('post.category', 'category');
    if (categories) {
      q.where('category.alias IN (:...categories)', { categories });
    }
    const entities = q.getMany();
    return entities;
  }

  async show(id: string) {
    const entity = await this.postRepository.findOne(id);
    return entity;
  }

  async update(id: string, data: Partial<PostDto>) {
    const result = await this.postRepository.update(id, data);
    return result;
  }

  async destroy(id: string) {
    const result = this.postRepository.delete(id);
    return result;
  }

  async vote(id: number, user: User) {
    await this.postRepository.createQueryBuilder().relation(User, 'voted').of(user).add(id);
  }

  async unVote(id: number, user: User) {
    await this.postRepository.createQueryBuilder().relation(User, 'voted').of(user).remove(id);
  }

  async liked(id: number) {
    return await this.postRepository.createQueryBuilder().relation(Post, 'liked').of(id).loadMany();
  }
}
