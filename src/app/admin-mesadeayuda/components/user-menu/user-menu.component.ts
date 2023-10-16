import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  public userImage = 'assets/images/others/admin.jpg';
  public userLogged="";
  public maillogged="";

  constructor() { }

  ngOnInit(): void {

    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    this.userImage=userauth.Imagen;
   
    this.userLogged=userauth.data.Usuario;
    let puesto:string;
    puesto=userauth.data.Puesto;
    if(  puesto.length>25)
    {
    this.maillogged=puesto.substring(0,24);
    }
    else
    {
      this.maillogged=puesto;
    }
  }

}
