import { Component } from '@angular/core';
import { User } from 'src/app/api/model/user';
@Component({
  selector: 'app-new-post-exploreview',
  templateUrl: './new-post-exploreview.component.html',
  styleUrls: ['./new-post-exploreview.component.css']
})
export class NewPostExploreviewComponent {
    loggedUser:User = JSON.parse(localStorage.getItem("user")!);

    constructor() { }

    ngOnInit(): void {
    }
}
