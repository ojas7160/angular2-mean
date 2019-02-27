import { Blog } from '../blogs-folder/blog.model';

export class BlogService {
  private blogs: Blog[] = [];

  getBlogs() {
    return [...this.blogs];
    // array in js do not actually copy
    // but we can copy its reference only
    // and this is a way to create a new
    // array and fill new array with old array.
  }

  addBlogs(title: string, description: string) {
    const blog: Blog = {title: title, description: description};
    this.blogs.push(blog);
  }
// tslint:disable-next-line:eofline
}