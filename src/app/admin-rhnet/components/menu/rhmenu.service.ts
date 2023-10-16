import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { RhMenu } from './rhmenu-model'; 
import { RHmenuItems } from './rhmenu';

@Injectable({
  providedIn: 'root'
})
export class RhMenuService {
  constructor(private location:Location,
              private router:Router){ } 
 

  public getMenuItems():Array<RhMenu> {
    return RHmenuItems;
  }

  public expandActiveSubMenu(menu:Array<RhMenu>){
    let url = this.location.path();
    let routerLink = decodeURIComponent(url);
    let activeMenuItem = menu.filter(item => item.routerLink === routerLink);
    if(activeMenuItem[0]){
      let menuItem = activeMenuItem[0];
      while (menuItem.parentId != 0){  
        let parentMenuItem = menu.filter(item => item.id == menuItem.parentId)[0];
        menuItem = parentMenuItem;
        this.toggleMenuItem(menuItem.id);
      }
    }
  }

  public toggleMenuItem(menuId){
    let menuItem = document.getElementById('menu-item-'+menuId);
    let subMenu = document.getElementById('sub-menu-'+menuId);  
    if(subMenu){
      if(subMenu.classList.contains('show')){
        subMenu.classList.remove('show');
        menuItem.classList.remove('expanded');
      }
      else{
        subMenu.classList.add('show');
        menuItem.classList.add('expanded');
      }      
    }
  }

  public closeOtherSubMenus(menu:Array<RhMenu>, menuId){
    let currentMenuItem = menu.filter(item => item.id == menuId)[0];
    menu.forEach(item => {
      if((item.id != menuId && item.parentId == currentMenuItem.parentId) || (currentMenuItem.parentId == 0 && item.id != menuId) ){
        let subMenu = document.getElementById('sub-menu-'+item.id);
        let menuItem = document.getElementById('menu-item-'+item.id);
        if(subMenu){
          if(subMenu.classList.contains('show')){
            subMenu.classList.remove('show');
            menuItem.classList.remove('expanded');
          }              
        } 
      }
    });
  } 

  public closeAllSubMenus(){        
    RHmenuItems.forEach(item => {
      let subMenu = document.getElementById('sub-menu-'+item.id);
      let menuItem = document.getElementById('menu-item-'+item.id);
      if(subMenu){
        if(subMenu.classList.contains('show')){
          subMenu.classList.remove('show');
          menuItem.classList.remove('expanded');
        }              
      } 
    });           
  }

}
