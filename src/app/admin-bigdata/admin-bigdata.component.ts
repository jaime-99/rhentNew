import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AppSettings, Settings } from '../app.settings';
import { Router, NavigationEnd } from '@angular/router'; 
import { BgdMenuService } from './components/bgd-menu/bgd-menu.service'; 
import { BigDataSerivce } from './service/bigdata.service';
import { AppService } from '../app.service';
import { Category } from '../app.models';

@Component({
  selector: 'app-admin-bigdata',
  templateUrl: './admin-bigdata.component.html',
  styleUrls: ['./admin-bigdata.component.scss']
})
export class AdminBigdataComponent implements OnInit {

  @ViewChild('sidenav') sidenav:any;  
  public userImage = 'assets/images/others/admin.jpg'; 
  public settings:Settings;
  public menuItems:Array<any>;
  public toggleSearchBar:boolean = false;
  public userLogged="";
  public maillogged="";
  public stringsearh="";
  public searchText!: string;
  public showBackToTop:boolean = false; 
  public categories:Category[];
  public category:Category;
  constructor(public bgdservice:BigDataSerivce,public appSettings:AppSettings, public appService:AppService,
              public router:Router,
              private menuService: BgdMenuService){        
    this.settings = this.appSettings.settings;
  }
  public getCategories(){    
    this.appService.getCategories().subscribe(data => {
      this.categories = data;
      this.category = data[0];
      this.appService.Data.categories = data;
    })
  }

  public changeCategory(event){
    if(event.target){
      this.category = this.categories.filter(category => category.name == event.target.innerText)[0];
    }
    if(window.innerWidth < 960){
      this.stopClickPropagate(event);
    } 
  }
  public stopClickPropagate(event: any){
 
    event.stopPropagation();
    event.preventDefault();
  }
  public remove(product) {
      const index: number = this.appService.Data.cartList.indexOf(product);
      if (index !== -1) {
          this.appService.Data.cartList.splice(index, 1);
          this.appService.Data.totalPrice = this.appService.Data.totalPrice - product.newPrice*product.cartCount;
          this.appService.Data.totalCartCount = this.appService.Data.totalCartCount - product.cartCount;
          this.appService.resetProductCartCount(product);
      }        
  }

  public clear(){
    this.appService.Data.cartList.forEach(product=>{
      this.appService.resetProductCartCount(product);
    });
    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;
  }
  public search(event:any){


    this.searchText = (event.target as HTMLInputElement).value;
    console.log(this.searchText);
    this.appService.search.next(this.searchText);

    let queryParams: any = {};
    queryParams.textSearch=this.searchText;
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; }


    this.router.onSameUrlNavigation='reload';
    this.router.navigate(['/bigdata/bdproductos',this.searchText],{queryParams:queryParams});
    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
  }

  ngOnInit() {  
    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    this.userImage=userauth.Imagen;
    console.log(userauth);

    

    this.bgdservice.GetUsuarioBigData(userauth.BigDataUsuarioId).subscribe((res)=>{
     console.log(res);
      localStorage.setItem('usuariobigdata',JSON.stringify(res));
    });
   
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
