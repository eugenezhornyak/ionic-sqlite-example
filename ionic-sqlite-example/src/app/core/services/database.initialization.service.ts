import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseInitializationService {

  readonly dbName = 'testDB';

  readonly initCmd = `
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT
  );`;

  readonly seedData = 'INSERT INTO products (id, title) VALUES (1, \"Potato\")';

  constructor(private sqliteService: SQLiteService) {
    this.initializeDatabase();
  }

  public async initializeDatabase(): Promise<any> {
    return this.sqliteService.initializePlugin().then(initResult => {
      console.log('Initialize result:' + initResult);
      this.sqliteService.getEcho('Hello!');
      this.sqliteService.openDB(this.dbName).then(openDBResult => {
        console.log('Database open result:' + JSON.stringify(openDBResult));
        this.sqliteService.execute(this.initCmd);
        this.sqliteService.execute(this.seedData);
      });
    });
  }
}
