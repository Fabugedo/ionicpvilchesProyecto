import { Injectable } from '@angular/core';
import { Capacitor} from "@capacitor/core";
import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from "@capacitor-community/sqlite";

@Injectable({
  providedIn: 'root'
})
export class ServicedbService {
      private db!: SQLiteDBConnection;
      readonly db_name: string = "estudiantes.db"
      readonly db_table: string = "estudiantes";

  private sqlite: SQLiteConnection

  constructor() {
      this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }
  async initDB(){
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
    console.log("Base de datos Inicializado");
    } catch (error) {


    }

  }
}
