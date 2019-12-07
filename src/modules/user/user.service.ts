import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { UpdatePasswordDto } from './user.updatePassword.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async store(data: UserDto) {
    const { name } = data;
    const user = await this.userRepository.findOne({ name });
    if (user) {
      throw new BadRequestException('用户已经存在了');
    }
    const entity = this.userRepository.create(data);
    return await this.userRepository.save(entity);
  }

  async show(id: string) {
    const entity = await this.userRepository.findOne(id, {
      relations: ['posts'],
    });
    if (!entity) {
      throw new NotFoundException('没有找到用户');
    }
    return entity;
  }

  async updatePassword(id: string, data: UpdatePasswordDto) {
    const { password, newPassword } = data;
    const entity = await this.userRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('没有找到用户');
    }
    const pass = await entity.comparePassword(password);
    if (!pass) {
      throw new BadRequestException('密码验证失败，请输入正确的密码');
    }
    entity.password = newPassword;
    return await this.userRepository.save(entity);
  }

  async findByName(name: string, showPassword?: boolean) {
    const q = this.userRepository.createQueryBuilder('user');
    q.where('user.name=:name', { name });
    if (showPassword) {
      q.addSelect('user.password');
    }
    q.leftJoinAndSelect('user.roles', 'roles');
    const entity = await q.getOne();
    return entity;
  }

  async liked(id: number) {
    return await this.userRepository.findOne(id, { relations: ['voted', 'voted.user'] });
  }

  async update(id: number, data: UserDto) {
    const { roles } = data;

    const entity = await this.userRepository.findOne(id);

    if (entity) {
      entity.roles = roles;
    }

    return await this.userRepository.save(entity);
  }

  async possess(
    id: number,
    resource: string,
    resourceId: number,
  ) {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id=:id', { id })
      .leftJoin(`user.${resource}`, resource)
      .andWhere(`${resource}.id=:resourceId`, { resourceId })
      .getCount();

    return result === 1 ? true : false;
  }
}
