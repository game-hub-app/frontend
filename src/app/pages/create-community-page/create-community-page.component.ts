import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { firstValueFrom } from 'rxjs';
import {
  Community,
  CommunityService,
  UserCommunities,
  UserCommunitiesService,
} from 'src/app/api';
import { CreateCommunityPageService } from 'src/app/services/create-community-page.service';

@Component({
  selector: 'app-create-community-page',
  templateUrl: './create-community-page.component.html',
  styleUrls: ['./create-community-page.component.css'],
})
export class CreateCommunityPageComponent implements OnInit {
  createCommunityForm: FormGroup = this.createCommunityPageService.buildForm();

  bannerChangedEvent: any = '';
  iconChangedEvent: any = '';
  croppedImage: any = '';
  imageType: any = '';

  @ViewChild('bannerInput') bannerInput: ElementRef | undefined;
  @ViewChild('iconInput') iconInput: ElementRef | undefined;

  loggedInUser: any = JSON.parse(localStorage.getItem('user') ?? '{}');

  constructor(
    private createCommunityPageService: CreateCommunityPageService,
    private communityService: CommunityService,
    private userCommunitiesService: UserCommunitiesService,
    private _router: Router
  ) {}

  ngOnInit() {
    if (!this.loggedInUser) {
      this._router.navigate(['/', 'login']);
    }

    const login = localStorage.getItem('token') ?? '';

    if (login == '') {
      this._router.navigate(['/', 'login']);
    }

    this.communityService.defaultHeaders =
      this.communityService.defaultHeaders.set(
        'Authorization',
        'Bearer ' + login
      );

    this.userCommunitiesService.defaultHeaders =
      this.userCommunitiesService.defaultHeaders.set(
        'Authorization',
        'Bearer ' + login
      );
  }

  getErrorMessage(label: string) {
    const formControl = this.createCommunityForm.get(label);

    if (formControl?.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  async createCommunity() {
    if (this.createCommunityForm.invalid) {
      return;
    }

    this.createCommunityForm.disable();

    var communityObject = this.createCommunityForm.value as Community;

    communityObject.id = '00000000-0000-0000-0000-000000000000';
    communityObject.creationDate = new Date();
    communityObject.communityOwnerId = this.loggedInUser.id;

    try {
      var community = await firstValueFrom(
        this.communityService.communityPost(communityObject)
      );

      if (community) {
        var userCommunitiesObject = {
          communityId: community.id,
          userId: this.loggedInUser.id,
          id: '00000000-0000-0000-0000-000000000000',
          creationDate: new Date(),
        } as UserCommunities;

        // Add logged in user to community
        await firstValueFrom(
          this.userCommunitiesService.userCommunitiesPost(userCommunitiesObject)
        );

        // Redirect to community page
        this._router.navigate(['/', 'community', community.id]);
      }
    } catch (error: any) {
      alert(error.error);
      this.createCommunityForm.enable();
      return;
    }
  }
  bannerChangeEvent(event: any): void {
    if (this.bannerInput!.nativeElement.files == ""){ return; }
    this.imageType = event.target.files[0].type;
    this.bannerChangedEvent = event;
  }
  iconChangeEvent(event: any): void {
    if (this.iconInput!.nativeElement.files == ""){ return; }
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
    this.iconInput!.nativeElement.value = "";
  }

  newPicture(banner:boolean){
    const file = this.croppedImage;
    const reader = new FileReader();
    reader.onload = () => {
      if(!banner){
        this.createCommunityForm.get('iconURL')?.patchValue(reader.result as string);
      }else{
        this.createCommunityForm.get('bannerURL')?.patchValue(reader.result as string);
      }
      this.clearCropper();
    }
    reader.readAsDataURL(file);
  }

}
