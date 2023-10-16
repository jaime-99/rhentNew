import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { SupportService } from "src/app/admin/support/service/support.service";
import { FormControl, Validators } from "@angular/forms";



@Component({
  selector: 'app-modificarPass',
  templateUrl: './modificarPass.component.html',
  styleUrls: ['./modificarPass.scss'],
})



export class modificarPass{
  constructor(private http: HttpClient , public authService:SupportService) {}
  correo:string="";

  recuperar() {
    if (this.correo) {
    this.authService.mandarCorreoRecuperacion(this.correo).subscribe(
      response => {
        console.log('Correo enviado correctamente');
        // Otros pasos a seguir después de enviar el correo
      },
      error => {
        console.error('Error al enviar el correo', error);
        // Manejo de errores
      }
    );

    }

}

}

