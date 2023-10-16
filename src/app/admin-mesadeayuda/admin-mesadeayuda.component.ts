import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AppSettings, Settings } from '../app.settings';
import { Router, NavigationEnd } from '@angular/router'; 
import { MaMenuService } from './components/menu/ma.menu.service'; 
@Component({
  selector: 'app-admin-mesadeayuda',
  templateUrl: './admin-mesadeayuda.component.html',
  styleUrls: ['./admin-mesadeayuda.component.scss']
})
export class AdminMesadeayudaComponent implements OnInit {

  @ViewChild('sidenav') sidenav:any;  
  public userImage = 'assets/images/others/admin.jpg'; 
  public settings:Settings;
  public menuItems:Array<any>;
  public toggleSearchBar:boolean = false;
  public userLogged="";
  public maillogged="";
  constructor(public appSettings:AppSettings, 
              public router:Router,
              private menuService: MaMenuService){        
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {  
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
    if(window.innerWidth <= 960){ 
      this.settings.adminSidenavIsOpened = false;
      this.settings.adminSidenavIsPinned = false;
    }; 
    setTimeout(() => {
      //this.settings.theme = 'green'; 
    });
    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    if(usuarioAuth.EsServicio=="1")
    this.menuItems = this.menuService.getMenuItems(1);
    else
    this.menuItems = this.menuService.getMenuItems(0);   
  }

  ngAfterViewInit(){  
    if(document.getElementById('preloader')){
      document.getElementById('preloader').classList.add('hide');
    } 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      } 
      if(window.innerWidth <= 960){
        this.sidenav.close(); 
      }                
    });  
    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    if(usuarioAuth.EsServicio=="1")
    this.menuService.expandActiveSubMenu(this.menuService.getMenuItems(0));  
    else
     this.menuService.expandActiveSubMenu(this.menuService.getMenuItems(0));  
  } 

  public toggleSidenav(){
    this.sidenav.toggle();
  }

  public scrollToTop(){
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset  / (scrollDuration / 20);
    var scrollInterval = setInterval(()=>{
      if(window.pageYOffset != 0){
         window.scrollBy(0, scrollStep);
      }
      else{
        clearInterval(scrollInterval); 
      }
    },10);
    if(window.innerWidth <= 768){
      setTimeout(() => {  
        window.scrollTo(0,0); 
      });
    }
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    if(window.innerWidth <= 960){
      this.settings.adminSidenavIsOpened = false;
      this.settings.adminSidenavIsPinned = false; 
    }
    else{ 
      this.settings.adminSidenavIsOpened = true;
      this.settings.adminSidenavIsPinned = true;
    }
  }

}
