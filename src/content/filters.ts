import { type Post } from '.'

export const onlyPublished = (post: Post) =>
  new Date(post.published).getTime() <= Date.now()
