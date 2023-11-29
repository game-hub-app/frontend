import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/api/model/user';
import { Operation, UserService } from 'src/app/api';
import { EditProfileService } from 'src/app/services/edit-profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  constructor(private userService: UserService, private editService:EditProfileService, private sanitizer:DomSanitizer) { }

  @Output() closeEdit = new EventEmitter<boolean>();
  loggedUser:User = null!;
  saveUser:User = null!;
  bannerChangedEvent: any = '';
  pfpChangedEvent: any = '';
  croppedImage: any = '';
  imageType:any = '';

  @ViewChild('bannerInput') bannerInput: ElementRef | undefined;
  @ViewChild('pfpInput') pfpInput: ElementRef | undefined;

  saveForm = new FormGroup({
    username: new FormControl(''),
    displayName: new FormControl(''),
    bio: new FormControl(''),
  });
  disableSave:boolean = false;

  closeTab(){
    this.closeEdit.emit(false);
  }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem("user")!);
    this.saveForm.setValue({
      username: this.loggedUser.username,
      displayName: this.loggedUser.displayName,
      bio: this.loggedUser.bio || "",
    });
  }

  bannerChangeEvent(event: any): void {
    if (this.bannerInput!.nativeElement.files == ""){ return; }
    this.imageType = event.target.files[0].type;
    this.bannerChangedEvent = event;
  }
  pfpChangeEvent(event: any): void {
    if (this.pfpInput!.nativeElement.files == ""){ return; }
    this.pfpChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.blob;
    console.log(this.croppedImage);
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
    this.pfpChangedEvent = '';
    this.bannerInput!.nativeElement.value = "";
    this.pfpInput!.nativeElement.value = "";
  }

  newPicture(banner:boolean){
    const file = this.croppedImage;
    const reader = new FileReader();
    reader.onload = () => {
      if(!banner){
        this.loggedUser.profilePictureURL = reader.result as string;
      }else{
        this.loggedUser.bannerURL = reader.result as string;
      }
      this.clearCropper();
    }
    reader.readAsDataURL(file);
  }

  saveChanges(){
    this.editService.saveChanges(this.loggedUser, this.saveForm.value.username!, this.saveForm.value.displayName!, this.saveForm.value.bio!);
  }

  checkMinLength(isUsername:boolean){
    if (isUsername){
      if(this.saveForm.value.username!.length < 4){
        this.disableSave = true;
      }else{
        this.disableSave = false;
      }
    }else{
      if(this.saveForm.value.displayName!.length < 6){
        this.disableSave = true;
      }else{
        this.disableSave = false;
      }
    }
  }

  
}
