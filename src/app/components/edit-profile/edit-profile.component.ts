import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/api/model/user';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/api';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  constructor(private userService: UserService) { }

  @Output() closeEdit = new EventEmitter<boolean>();
  loggedUser:User = null!;
  saveUser:User = null!;
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

  newPicture(event:any, banner:boolean){
    let image = event.target.files[0];
    let reader = new FileReader();
    reader.onload = () =>{
        if(!banner){
          this.loggedUser.profilePictureURL = reader.result as string;
        }else{
          this.loggedUser.bannerURL = reader.result as string;
        }
    }
    reader.readAsDataURL(image);
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

  async saveChanges(){
    this.saveUser = this.loggedUser;
    let username = this.saveForm.get('username')!.value;
    let displayName = this.saveForm.get('displayName')!.value;
    let bio = this.saveForm.get('bio')!.value;

    this.saveUser.username = username || this.loggedUser.username;
    this.saveUser.displayName = displayName || this.loggedUser.displayName;
    this.saveUser.bio = bio || this.loggedUser.bio;

    try{
      let userCreds = await firstValueFrom(this.userService.userIdGet(this.saveUser.id));
      this.saveUser.hash = userCreds.hash;
      this.saveUser.salt = userCreds.salt;

      await firstValueFrom(this.userService.userIdPut(this.saveUser.id, this.saveUser));
      let savedUser = await firstValueFrom(this.userService.userProfileUsernameGet(this.saveUser.username));
      localStorage.setItem("user", JSON.stringify(savedUser));
      location.reload();
    } catch(error:any){
      console.log(error.error);
    }
  }
}
