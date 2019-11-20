import { Controller, Get, Param, Post, Body, HttpException, HttpStatus, ForbiddenException, UseFilters, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CreatePostDto } from './createPostDto';
import { DemoService } from './providers/demo/demo.service';
import { DemoFilter } from 'src/core/filters/demo.filter';

@Controller('posts')
// @UseFilters(DemoFilter)
export class PostsController {
  constructor(private readonly demoService: DemoService) {
  }

  @Get()
  // @UseFilters(DemoFilter)
  index() {
    return this.demoService.findAll();
    // throw new HttpException('没有权限！', HttpStatus.FORBIDDEN)
    // throw new ForbiddenException('没有权限')
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id) {
    const content = `Post ${typeof id} ${id}`;
    console.log(content);
    return content;
  }

  @Post()
  @UsePipes(ValidationPipe)
  store(@Body() post: CreatePostDto) {
    this.demoService.create(post);
  }
}
