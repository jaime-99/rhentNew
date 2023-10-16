import { Component, OnInit, Input} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaService } from 'src/app/admin-mesadeayuda/ma.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  constructor(public appService:MaService,public router:Router) { }

  ngOnInit()  { }
  GotoBigData()
  {
    window.open('https://www.dikeninternational.com/bigdata/', '_blank');
  }
  GotoMesadeAyuda()
{
  window.open('https://dikeninternational.com/mesadeayuda', '_blank');
}
GotoRHNET()
{
  window.open('https://rhnet.dikeninternational.com/rh_login.php', '_blank');
}
GotoUniversidadDiken()
{
  window.open('https://www.unidiken.dikeninternational.com', '_blank');
}
  openMegaMenu(){
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
        if(el.children.length > 0){
          if(el.children[0].classList.contains('mega-menu')){
            el.classList.add('mega-menu-pane');
          }
        }        
    });
  }

  public search(event:any){


    let searchText = event;
    console.log(searchText);
    

    let queryParams: any = {};
    queryParams.textSearch=searchText;
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; }


    this.router.onSameUrlNavigation='reload';
    this.router.navigate(['/productos',searchText],{queryParams:queryParams});
    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
  }
  

}
