import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-modal-desktop',
  templateUrl: './search-modal-desktop.component.html',
  styleUrls: ['./search-modal-desktop.component.css']
})
export class SearchModalDesktopComponent {
  constructor(
    public dialogRef: MatDialogRef<SearchModalDesktopComponent>,
  ) { }
  @ViewChild('searchChild') searchChild: ElementRef | undefined;
  @ViewChild('searchIcon') searchIcon: ElementRef | undefined;
  disableSearch: boolean = true;

  ngAfterViewInit() {
    if (this.searchChild) {
      this.searchChild.nativeElement.addEventListener("keyup", this.handleSearchInput);
    }
  }

  handleSearchInput = (event: KeyboardEvent) => {
    if (this.disableSearch == false && event.key == 'Enter'){
      window.location.href = '/search?query=' + (event.target as HTMLInputElement).value;
      this.closeModal();
    }
    let searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm.length >= 3 ){
      this.disableSearch = false;
    }else if (searchTerm.length < 3){
      this.disableSearch = true;
    }
  }

  closeModal(){
    if (!this.disableSearch){
        this.dialogRef.close();
    }
  }


  ngOnDestroy() {
    if (this.searchChild) {
      this.searchChild.nativeElement.removeEventListener('input', this.handleSearchInput);
    }
  }
}