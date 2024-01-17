import { Component, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Community, CommunityService, User } from 'src/app/api';
import { EditCommunityService } from 'src/app/services/edit-community.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCommunityComponent } from '../../global/delete-community/delete-community.component';

@Component({
  selector: 'app-edit-community',
  templateUrl: './edit-community.component.html',
  styleUrls: ['./edit-community.component.css']
})
export class EditCommunityComponent {
  constructor(
    private communityService: CommunityService,
    private editService:EditCommunityService,
    private sanitizer:DomSanitizer,
    private dialog:MatDialog
  ){}

  @Output() closeEdit = new EventEmitter<boolean>();

  loggedUser:User = null!;
  @Input() community:Community = null!;
  saveCommunity:Community = null!;

  bannerChangedEvent: any;
  iconChangedEvent: any;
  croppedImage:any = '';
  imageType:any = '';
  loading:boolean = false;

  @ViewChild('bannerInput') bannerInput: ElementRef | undefined;
  @ViewChild('pfpInput') pfpInput: ElementRef | undefined;
  saveForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });
  disableSave:boolean = false;
  
  openDeleteDialog(){
    this.dialog.open(DeleteCommunityComponent, {
      data: this.community.id
    });
  }

  closeTab(){
    this.closeEdit.emit(false);
  }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem("user")!);
    this.saveForm.setValue({
      name: this.community.name,
      description: this.community.description || "",
    });
  }

  bannerChangeEvent(event: any): void {
    if (this.bannerInput!.nativeElement.files == ""){ return; }
    this.imageType = event.target.files[0].type;
    this.bannerChangedEvent = event;
  }

  iconChangeEvent(event:any):void{
    if(this.pfpInput!.nativeElement.files == ""){ return; }
    this.iconChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.blob;
  }
  imageLoaded(image: LoadedImage) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  clearCropper(){
    this.croppedImage = '';
    this.bannerChangedEvent = '';
    this.iconChangedEvent = '';
    this.bannerInput!.nativeElement.value = "";
    this.pfpInput!.nativeElement.value = "";
  }

  newPicture(banner:boolean){
    const file = this.croppedImage;
    let reader = new FileReader();
    reader.onload = () => {
      if(!banner){
        this.community.iconURL = reader.result as string;
      } else {
        this.community.bannerURL = reader.result as string;
      }
      this.clearCropper();
    }
    reader.readAsDataURL(file);
  }

  async saveChanges(){
    this.loading = true;
     await this.editService.saveChanges(this.community, this.saveForm.value.name!, this.saveForm.value.description!);
  }

  checkMinLength(isName:boolean){
    if (this.saveForm.value.name!.length < 3){
      this.disableSave = true;
    } else {
      this.disableSave = false;
    }
  }
}
