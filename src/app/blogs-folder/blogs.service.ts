import { Injectable } from '@angular/core';
import { Blog } from '../blogs-folder/blog.model';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'}) // providedIn: 'root' let us defining service here only rather injecting in providers array in app module
export class BlogService {
  private blogs: Blog[] = [];
  private blogsUpdated = new Subject<Blog[]>();
  constructor(private http: HttpClient) {}
  getBlogs() {
    console.log('yes');
    console.log('-----');
    this.http.get<{message: string, blogs: any}>('http://localhost:3001/api/blogs/all-blogs')
    .pipe(map((blogData) => {
      console.log(blogData);
      return blogData.blogs.map(blog => {
        return {
          title: blog.title,
          description: blog.description,
          id: blog._id,
          imagePath: blog.imagePath
        };
      });
    }))
    .subscribe((tranformedData) => {
      console.log('blog response', tranformedData);
      this.blogs = tranformedData;
      this.blogsUpdated.next([...this.blogs]);
    });
    // return  [...this.blogs]; // this doesn't return blogs initially because this makes a copy and we need to subscribe by this way
    // array in js do not actually copy
    // but we can copy its reference only
    // and this is a way to create a new
    // array and fill new array with old array.
  }

  addBlogs(title: string, description: string, userId: string, image: File) {
    console.log(title);
    console.log(description);
    // console.log(userId);
    console.log(image);
    const blog: any = {title: title, description: description, userId: userId, image: image};
    const blogData: any = new FormData();
    console.log(blogData);
    blogData.append('title', title);
    blogData.append('description', description);
    blogData.append('userId', userId);
    blogData.append('image', image, title);
    // console.log(blog);
    this.http.post("http://localhost:3001/api/blogs/create", blogData)
      .subscribe((response) => {
        console.log(response);
      });
    // this.blogs.push();
    // this.blogsUpdated.next([...this.blogs]);
  }

  getBlog(id: string) {
    return this.http.get<{_id: string, title: string, description: string, imagePath: string}>('http://localhost:3001/api/blogs/' + id);
  }

  updateBlog(id: string, title: string, description: string, image: string | File) {
    console.log('service');
    let blogData: Blog | FormData ;
    if (typeof(image) == 'object') {
      blogData = new FormData();
      blogData.append("title", title);
      blogData.append("description", description);
      blogData.append("id", id);
      blogData.append("image", image, title);
    } else {
      blogData = {
        title: title,
        description: description,
        id: id,
        imagePath: image
      };
    }
    this.http.put<{message: string}>('http://localhost:3001/api/blogs/' + id, blogData)
    .subscribe((response) => {
      console.log(response);
      const updatedBlogs = [...this.blogs];
      const blogIndex = updatedBlogs.findIndex(blog => blog.id === id);
      // updatedBlogs[blogIndex] = blog;
      // this.blogsUpdated.next([...updatedBlogs]);
    });
  }

  getblogWithoutReq(id: string) {
    console.log(this.blogs);
    return {...this.blogs.find((blog) => blog.id === id)};
  }

  getBlogUpdatedListener() {
    console.log('kjdshkjh');
    return this.blogsUpdated.asObservable();
  }
// tslint:disable-next-line:eofline
}