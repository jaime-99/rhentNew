import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../../app.service';
import { Settings, AppSettings } from '../../../app.settings';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})


export class TopMenuComponent implements OnInit {
  public currencies = ['USD', 'EUR'];
  public currency:any; 
  public rutabanderas="";
  public userLogged="";
  public maillogged="";
  public userImage="";

  public settings: Settings;
  constructor(public appSettings:AppSettings, public appService:AppService, public translateService: TranslateService) { 
    this.settings = this.appSettings.settings; 
  } 

  ngOnInit() {
    this.currency = this.currencies[0];  
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

  public changeCurrency(currency){
    this.currency = currency;
  } 

  public changeLang(lang:string){ 
    this.translateService.use(lang);   
  } 

  public getLangText(lang){
    if(lang == 'de'){
      return 'German';
    }
    else if(lang == 'fr'){
      return 'French';
    }
    else if(lang == 'ru'){
      return 'Russian';
    }
    else if(lang == 'tr'){
      return 'Turkish';
    }
    else{
      return 'English';
    }
  } 

}
