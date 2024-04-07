import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-featured-blogs',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './featured-blogs.component.html',
  styleUrl: './featured-blogs.component.scss'
})
export class FeaturedBlogsComponent {

}
