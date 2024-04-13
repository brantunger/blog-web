import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";

@Component({
    selector: 'app-all-blogs',
    standalone: true,
    templateUrl: './all-blogs.component.html',
    styleUrl: './all-blogs.component.scss',
    imports: [CardComponent]
})
export class AllBlogsComponent {

}
