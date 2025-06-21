import { Injectable } from '@angular/core';
import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from "@capacitor-community/sqlite";
import {identifierName} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class ServicedbService {
      private db!: SQLiteDBConnection;
      readonly db_name: string = "estudiantes.db"
      readonly db_table: string = "estudiantes";

  private sqlite: SQLiteConnection;
  private isInitialized: boolean = false;

  constructor() {
      this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }
  async initDB(){
    if(this.isInitialized) return;
    try {
      this.db = await this.sqlite.createConnection(
        this.db_name,
        false,
        "no-encryption",
        1,
        false
      );
    await this.db.open();
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${this.db_table} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rut TEXT NOT NULL,
        nombre TEXT NOT NULL,
        apellidop TEXT NOT NULL,
        apellidom TEXT NOT NULL,
        correo TEXT NOT NULL
        );
    `;
    await this.db.execute(createTableQuery);
    this.isInitialized = true;
    console.log("Base de datos Inicializado");
    } catch (error) {
        console.log("Error al inicializar la base de datos", error);
        }
  }
  async addItem(rut: string, nombre: string, apellidop: string, apellidom: string, correo: string){
    try {
      if(!rut || !nombre || !apellidop || !apellidom || !correo){
        alert('Por favor, Ingrese todos los campos');
        return
      }
      const insertQuery = `
        INSERT INTO ${this.db_table}
          (rut, nombre, apellidop, apellidom, correo) VALUES (?,?,?,?,?)
          `;
      const values = [rut, nombre, apellidop, apellidom, correo];
      await this.db.run(insertQuery, values);
      console.log("Estudiante fue Agregado");

    } catch (error) {
      console.error('Error al agregar el estudiante: ', error);
    }
  }

  async getAllStudents(): Promise<any[]>{
    try {
        const SelectQuery = `SELECT * FROM ${this.db_table}`;
        const res = await this.db.query(SelectQuery);
        return res.values? res.values : [];
    } catch (error) {
      console.error('Error al obtener los estudiantes: ', error);
      return [];
    }
  }
  async deleteStudent(id: number){
    try {
      const deletequery = `DELETE FROM ${this.db_table} WHERE id = ?`;
      await this.db.run(deletequery, [id]);
      console.log("Estudiante fue Eliminado");
    } catch (error) {
      console.error('Error al eliminar el estudiante: ', error);
    }
  }



}
