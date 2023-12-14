import { Component, ElementRef, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/api';
import { UserService } from 'src/app/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteAccountComponent>,
    private _authService:AuthService, 
    private userService:UserService, 
    private _snackBar:MatSnackBar
  ) { }  
    
  @ViewChild('passwordField') passwordField: ElementRef | undefined;

  async deleteAccount(token:String){
    this.userService.defaultHeaders = this.userService.defaultHeaders.set('Authorization', 'Bearer ' + token);
    try{

      let deletion = await firstValueFrom(this.userService.userIdDelete(JSON.parse(localStorage.getItem("user")!).id));
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href= "/";
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
