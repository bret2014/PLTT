import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interface/user.interface';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  todo: Usuario = {
    uid: '',
    correo: '',
    tipo: '',
    nombre: '',
    apellido: ''
  };

  todoId= null;
  constructor(private route: ActivatedRoute, private nav: NavController, private todoService: UsuarioService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId){
      this.loadTodo();
    }
  }

  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    await loading.present();

    this.todoService.getUsuario(this.todoId).subscribe(todo => {
      loading.dismiss();
      this.todo = todo;
      console.log(this.todo);
    });
  }

  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();
 
    if (this.todoId) {
      this.todoService.updateUsuario(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/usuarios');
      });
    } else {
      this.todoService.addUsuario(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/usuarios');
      });
    }
  }
  async onRemoveTodo(idTodo:string) {
    this.todoService.removeTodo(idTodo);
  }

}
