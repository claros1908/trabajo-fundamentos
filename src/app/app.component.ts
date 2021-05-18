import { Component, VERSION } from '@angular/core';
import { FireService } from './fireservice';
import { libro } from './libro';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /******
   * ATRIBUTOS
   *****/
  public libros: libro[];
  public nuevo_libro: string;
  public actualizar_libro: string;

  constructor(private fireService: FireService) {
    this.libros = [];
    this.nuevo_libro = '';
    this.getLibros();
  }

  //Método para obtener todos los libros
  getLibros() {
    this.fireService.get().subscribe(
      (respLibro: libro[]) => {
        //Aquí obtiene el resultado de la consulta
        this.libros = respLibro;
      },
      error => {
        //Aquí imprime el error en caso de no comunicarse con firebase o un error de BD
        console.error(error);
      }
    );
  }

  crearLibro() {
    let libro: libro = {
      nombre: this.nuevo_libro
    };
    this.fireService.post(libro).then(resp => {
      this.nuevo_libro = '';
    });
  }

  eliminar(id: any) {
    this.fireService.delete(id);
  }
  editar(id: any, libro: libro) {
    libro = {
      nombre: this.actualizar_libro
    };
    this.fireService.editar(id, libro).then(resp => {
      this.actualizar_libro = '';
    });
  }
}
