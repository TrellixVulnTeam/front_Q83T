import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();

  constructor( private usuariosService: UsuariosService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(id !== 'nuevo'){
      this.usuariosService.getUsuario(id).subscribe( (resp: UsuarioModel) => {
        this.usuario = resp;
        this.usuario.id = id;
      });
    }
  }

  guardar( form: NgForm ){
    if (form.invalid) {
      console.log('Formulario no valido.');
      return;
    }

    if(this.usuario.id){
      this.usuariosService.actualizarUsuario( this.usuario ).subscribe( resp => {
        console.log(resp)
      });
      alert('Usuario Actualizado.');
    } else {
      this.usuariosService.crearUsuario( this.usuario ).subscribe(
        resp => {
          console.log(resp);
        }
      )
      alert('Usuario Creado.');
    }
  }

}
