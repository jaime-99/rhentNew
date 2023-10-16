import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  
  constructor(
               private router: Router ){}


  canActivate(): Observable<boolean> | boolean {
      let usuarioauth:any;

    usuarioauth=JSON.parse(localStorage.getItem('datalogin')!);

    if(usuarioauth==undefined)
    {
        return false;
    }
    if(!usuarioauth.ok)
    {
        return false;

    }
    return true;
  }

  canLoad(): Observable<boolean> | boolean {
    let usuarioauth:any;

    usuarioauth=JSON.parse(localStorage.getItem('datalogin')!);

    if(usuarioauth==undefined)
    {
        this.router.navigate(['/sign-in']);
        return false;
    }
    if(!usuarioauth.ok)
    {
        this.router.navigate(['/sign-in']);
        return false;

    }
    return true;
  }
}
