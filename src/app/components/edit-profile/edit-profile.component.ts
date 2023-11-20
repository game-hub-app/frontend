import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/api/model/user';
import { Operation, UserService } from 'src/app/api';
import { EditProfileService } from 'src/app/services/edit-profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  constructor(private userService: UserService, private editService:EditProfileService) { }

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
