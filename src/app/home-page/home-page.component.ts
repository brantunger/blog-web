import { Component } from '@angular/core';
import { FeaturedBlogsComponent } from '../featured-blogs/featured-blogs.component';
import { AllBlogsComponent } from "../all-blogs/all-blogs.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    imports: [FeaturedBlogsComponent, AllBlogsComponent]
})
export class HomePageComponent {
}
