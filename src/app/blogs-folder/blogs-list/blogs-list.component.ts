import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../blog.model';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css']
})
export class BlogsListComponent implements OnInit {
  @Input() blogs: Blog[] = [];
  constructor() { }

  ngOnInit() {
  }

}
