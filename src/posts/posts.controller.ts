import { Controller, Get, Req, Query, Headers, Param, Post, Body } from '@nestjs/common';
import { CreatePostDto } from './createPostDto';

@Controller('posts')
export class PostsController {
  @Get()
  index(@Req() request, @Query() query, @Headers('authorization') headers) {
    console.log(headers);
    console.log(query);
    console.log(request.ip, request.hostname, request.method);
    return ['posts!']
  }

  @Get(':id')
  show(@Param() params) {
    const content = `Post ${params.id}`;
    console.log(content);
    return content;
  }

  @Post()
  store(@Body() body: CreatePostDto) {
    console.log(body.title);
  }
}
