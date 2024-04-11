import { Component } from '@angular/core';
import { FeaturedBlogsComponent } from '../featured-blogs/featured-blogs.component';

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    imports: [FeaturedBlogsComponent]
})
export class HomePageComponent {
}
