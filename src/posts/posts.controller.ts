import { Controller, Get, Req, Query, Headers, Param } from '@nestjs/common';

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
  fn(@Param() params) {
    const content = `Post ${params.id}`;
    console.log(content);
    return content;
  }
}
