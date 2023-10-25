import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comm-icon',
  templateUrl: './comm-icon.component.html',
  styleUrls: ['./comm-icon.component.css']
})
export class CommIconComponent implements OnInit {

 @Input() CommImage?: string;
 @Input() communityID?: string;

  constructor(private router:Router) { }

  ngOnInit() {
  }
  commRedirect(){
    this.router.navigate(['/community']);
  }
}
