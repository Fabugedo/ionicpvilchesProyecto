import { Component, OnInit } from '@angular/core';
import { ServicedbService } from 'src/app/service/servicedb.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
  standalone: false,
})
export class FormularioPage implements OnInit {

  rut: string = "";
  nombre: string = "";
  apellidop: string = "";
  apellidom: string = "";
  correo: string = "";

  constructor(private dbService: ServicedbService) { }

  async ngOnInit () {
    await this.dbService.initDB();
  }
  async addStudent(event: Event){
    event.preventDefault();
    await this.dbService.addItem(this.rut, this.nombre, this.apellidop, this.apellidom, this.correo);

    this.rut = "";
    this.nombre = "";
    this.apellidop = "";
    this.apellidom = "";
    this.correo = "";
  }
}
