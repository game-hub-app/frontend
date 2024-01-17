import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/api';
import { CommunityService } from 'src/app/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-community',
  templateUrl: './delete-community.component.html',
  styleUrls: ['./delete-community.component.css']
})
export class DeleteCommunityComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCommunityComponent>,
    private _authService:AuthService, 
    private communityService:CommunityService, 
    private _snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { }  
  
  @ViewChild('passwordField') passwordField: ElementRef | undefined;
  communityID:string | undefined = this.data;
  async deleteAccount(token:String){
    this.communityService.defaultHeaders = this.communityService.defaultHeaders.set('Authorization', 'Bearer ' + token);
    try{

      let deletion = await firstValueFrom(this.communityService.communityIdDelete(this.communityID!));
      window.location.href= "/feed";
    }catch(err)
    {
      console.log(err);
    }
  }

  async verifyPassword(){
    let password = this.passwordField?.nativeElement.value;
    try{
      const login = await firstValueFrom(
      this._authService.authLoginPost({
        usernameOrEmail: JSON.parse(localStorage.getItem("user")!).username,
        password: password
      })
      );
      if(login != ""){
        this.deleteAccount(login);
      }
    }catch(err){
      this._snackBar.open("Incorrect Password.", 'Close', {
        duration: 2000,
      });
    }


  }

  onNoClick(){
    this.dialogRef.close();
  }
}
