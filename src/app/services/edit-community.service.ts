import { Injectable } from '@angular/core';
import { Community, Operation } from 'src/app/api';
import { firstValueFrom } from 'rxjs';
import { CommunityService } from 'src/app/api';


@Injectable({
  providedIn: 'root'
})
export class EditCommunityService {
  constructor(private communityService: CommunityService) {
  }

  async saveChanges(community:Community, name:string, description:string){
    let saveCommunity = community;
    saveCommunity.name = name || community.name;
    saveCommunity.description = description || community.description;


    if (localStorage.getItem("token") !== null) { 
      this.communityService.defaultHeaders = this.communityService.defaultHeaders
        .set('Authorization', 'Bearer ' + localStorage.getItem("token"));
    };

    try{

      let savedCommunity = await firstValueFrom(this.communityService.communityIdPut(saveCommunity.id, saveCommunity));
      location.reload();
    } catch(error:any){
      console.log(error.error);
    }
  }
}
