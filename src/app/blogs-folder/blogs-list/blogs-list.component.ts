import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../blog.model';
import { BlogService } from '../blogs.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css']
})
export class BlogsListComponent implements OnInit {
  @Input() blogs: Blog[] = [];
  constructor(public blogService: BlogService) {
    // this blogService, we can fetch
    // this variable in the entire file
    // with 'this.blogService' only because
    // of public otherwise we have to define
    // a variable first and assigne it to that
    // variable defined and then use that variable
    // in file.
   }

  ngOnInit() {
  }

}
