import { Injectable } from '@angular/core';
import { UserService } from '../api';
import { User } from '../api/model/user';
import { firstValueFrom } from 'rxjs';
import { Operation } from '../api/model/operation';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  

  constructor(private userService: UserService) {
  }

  async saveChanges(loggedUser:User, username:string, displayName:string, bio:string){
    let saveUser = loggedUser;

    saveUser.username = username || loggedUser.username;
    saveUser.displayName = displayName || loggedUser.displayName;
    saveUser.bio = bio || loggedUser.bio;

    if (localStorage.getItem("token") !== null) { 
      this.userService.defaultHeaders = this.userService.defaultHeaders
        .set('Authorization', 'Bearer ' + localStorage.getItem("token"));
    };

    try{
      let operations = [
        {op: "replace", path: "/username", value: saveUser.username},
        {op: "replace", path: "/displayName", value: saveUser.displayName},
        {op: "replace", path: "/bio", value: saveUser.bio},
        {op: "replace", path: "/profilePictureURL", value: saveUser.profilePictureURL},
        {op: "replace", path: "/bannerURL", value: saveUser.bannerURL},  
      ] as Operation[];
      let savedUser = await firstValueFrom(this.userService.userIdPatch(loggedUser.id, operations));
      localStorage.setItem("user", JSON.stringify(savedUser));
      location.reload();
    } catch(error:any){
      console.log(error.error);
    }
  }
}
