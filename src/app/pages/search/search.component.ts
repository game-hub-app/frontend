import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, Community, Post } from 'src/app/api';
import { TokenVerificationService } from 'src/app/services/token-verification.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  loggedUser: User = JSON.parse(localStorage.getItem('user') ?? '{}');
  disableSearch:boolean = true;
  isLoading:boolean = false;
  searchTerm:string = '';
  tabIndex:number = 0;
  @ViewChild('searchChild') searchChild: ElementRef | undefined;

  communityResults:Community[] = [];
  userResults:User[] = [];
  postResults:Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private _search:SearchService,
    private tokenVerify:TokenVerificationService
    ) {    
      this.tokenVerify.verifyToken().then((res) => {
        if(!res){
          localStorage.clear();
          window.location.href = '/login';
        }
      });
    }

  ngAfterViewInit() {
    this.searchChild!.nativeElement.addEventListener("keyup", this.handleSearchInput);
  }

  handleSearchInput = (event: KeyboardEvent) => {
    if (this.disableSearch == false && event.key == 'Enter'){
      this.search(false);
    }
    let searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm.length >= 3 ){
      this.disableSearch = false;
    }else if (searchTerm.length < 3){
      this.disableSearch = true;
    }
  }

  async search(fromOutside:boolean): Promise<void> {
    this.isLoading = true;
    this.disableSearch = true;
    if(!fromOutside){
      this.searchTerm = this.searchChild!.nativeElement.value;
    }

    this.communityResults = await this._search.searchCommunities(this.searchTerm);
    this.userResults = await this._search.searchUsers(this.searchTerm);
    this.postResults = await this._search.searchPosts(this.searchTerm);
    this.isLoading = false;
  }

  changeTab(tab:number): void {
    this.tabIndex = tab;
    window.scrollTo(0, 0);
  }

  async ngOnInit(): Promise<void> {

    this.route.queryParams.subscribe(params => {
      if (params['query'] != undefined){
        this.searchTerm = params['query'];
        this.search(true);
      }
    });
  }
}
