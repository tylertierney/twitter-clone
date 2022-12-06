import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  text: string | null = null;

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {}

  test(e: Event) {
    this.text = (e.target as HTMLDivElement).textContent;
  }

  resizeTextArea(textarea: HTMLTextAreaElement) {
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
