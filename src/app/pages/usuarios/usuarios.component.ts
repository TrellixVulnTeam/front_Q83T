import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios : UsuarioModel[] = [];
  cargando = false;


  constructor( private usuariosServicio: UsuariosService) { }

  ngOnInit() {
    this.cargando = true;
    this.usuariosServicio.getUsuarios().subscribe(resp => {
      this.usuarios = resp;
      this.cargando = false;
    });
  }

  borrarUsuario(usuario: UsuarioModel, i: number){
    this.usuarios.splice(i, 1);
    this.usuariosServicio.borrarUsuario(usuario.id).subscribe();
  }

}
