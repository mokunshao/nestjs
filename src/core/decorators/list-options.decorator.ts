import { createParamDecorator } from '@nestjs/common';
import { ListOptionsInterface } from '../interfaces/list-options.interface';

export const ListOptions = createParamDecorator((data: Partial<ListOptionsInterface> = {}, req) => {
  let { categories, tags, page, limit, sort, order } = req.query;

  if (categories) {
    categories = categories.split('-');
  }

  if (tags) {
    tags = tags.split('-');
  }

  if (page) {
    page = parseInt(page, 10);
  } else {
    page = 1;
  }

  if (limit) {
    limit = parseInt(limit, 10);
  } else if (data.limit) {
    limit = data.limit;
  } else {
    limit = 3;
  }

  if (sort) {
    sort = sort;
  } else if (data.sort) {
    sort = data.sort;
  } else {
    sort = 'created';
  }

  if (order) {
    order = order.toUpperCase();
  } else if (data.order) {
    order = data.order;
  } else {
    order = 'DESC';
  }

  return {
    categories,
    tags,
    page,
    limit,
    sort,
    order,
  };
});
