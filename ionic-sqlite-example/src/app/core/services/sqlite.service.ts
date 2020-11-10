import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { } from '@capacitor-community/sqlite';
const { CapacitorSQLite, Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {

  private sqlite: any;
  private platform: string;
  private isStarted = false;
  private readonly SNSErrMessage = 'Service not started';

  constructor() { }

  async initializePlugin() {
    const info = await Device.getInfo();
    this.platform = info.platform;
    this.sqlite = CapacitorSQLite;
    this.isStarted = true;

    if (this.platform === 'android') {
      try {
        this.sqlite.requestPermissions();
      } catch (e) {
        console.log('Error requesting permissions!' + JSON.stringify(e));
        this.isStarted = false;
      }
    }
    return;
  }

  /**
   * Get Echo
   * @param value string
   */
  async getEcho(value: string): Promise<any> {
    if (this.isStarted) {
      return await this.sqlite.echo({value});
    } else {
      return Promise.resolve(this.SNSErrMessage);
    }
  }

  /**
   * Open a Database
   * @param dbName string
   * @param _encrypted boolean optional
   * @param _mode string optional
   */
  async openDB(dbName: string, encrypted = false, mode = 'no-encryption', version = 1): Promise<any> {
    if (this.isStarted) {
      return await this.sqlite.open({ database: dbName, encrypted, mode, version });
    } else {
      return Promise.resolve({ result: false, message: this.SNSErrMessage });
    }
  }

  async createSyncTable(): Promise<any> {
    if (this.isStarted) {
      return await this.sqlite.createSyncTable();
    } else {
      return Promise.resolve({ changes: -1, message: this.SNSErrMessage });
    }
  }

  /**
   * Execute a set of Raw Statements
   * @param statements string
   */
  async execute(statements: string): Promise<any> {
    if (this.isStarted && statements.length > 0) {
      console.log(JSON.stringify({ statements }));
      return await this.sqlite.execute({ statements });
    } else {
      return Promise.resolve({ changes: -1, message: this.SNSErrMessage });
    }
  }

  /**
   * Execute a set of Raw Statements as Array<any>
   * @param set Array<any>
   */
  async executeSet(set: Array<any>): Promise<any> {
    if (this.isStarted && set.length > 0) {
      return await this.sqlite.executeSet({ set });
    } else {
      return Promise.resolve({ changes: -1, message: this.SNSErrMessage });
    }
  }

  /**
   * Execute a Single Raw Statement
   * @param statement string
   */
  async run(statement: string, values?: Array<any>): Promise<any> {
    if (this.isStarted && statement.length > 0) {
      return await this.sqlite.executeSet({ statement, values });
    } else {
      return Promise.resolve({ changes: -1, message: this.SNSErrMessage });
    }
  }

  /**
   * Close the Database
   * @param dbName string
   */
  async close(dbName: string): Promise<any> {
    if (this.isStarted) {
      return await this.sqlite.close({ database: dbName });
    } else {
      return Promise.resolve({ changes: false, message: this.SNSErrMessage });
    }
  }

  /**
   * Check if the Database file exists
   * @param dbName string
   */
  async isDBExists(dbName: string): Promise<any> {
    if (this.isStarted) {
      return await this.sqlite.isDBExists({ database: dbName });
    } else {
      return Promise.resolve({ changes: false, message: this.SNSErrMessage });
    }
  }

  /**
   * Delete the Database file
   * @param dbName string
   */
  async deleteDB(dbName: string): Promise<any> {
    if (this.isStarted) {
      return await this.sqlite.deleteDatabase({ database: dbName });
    } else {
      return Promise.resolve({ changes: false, message: this.SNSErrMessage });
    }
  }

  /**
   * Check the validity of a JSON Object
   * @param jsonstring string
   */
  async isJsonValid(jsonstring: string): Promise<any> {
    if (this.isStarted) {
      return await this.sqlite.isJsonValid({ jsonstring });
    } else {
      return Promise.resolve({ changes: false, message: this.SNSErrMessage });
    }
  }

  /**
   * Import a database From a JSON
   * @param jsonstring string
   */
  async importFromJson(jsonstring: string): Promise<any> {
    if (this.isStarted) {
      return await this.sqlite.importFromJson({ jsonstring });
    } else {
      return Promise.resolve({ changes: -1, message: this.SNSErrMessage });
    }
  }

  /**
   * Export the given database to a JSON Object
   * @param mode string
   */
  async exportToJson(mode: string): Promise<any> {
    if (this.isStarted) {
      return await this.sqlite.exportToJson({ jsonexportmode: mode });
    } else {
      return Promise.resolve({ export: {}, message: this.SNSErrMessage });
    }
  }
  async setSyncDate(syncDate: string): Promise<any> {
    if (this.isStarted) {
      return await this.sqlite.setSyncDate({ syncdate: syncDate });
    } else {
      return Promise.resolve({ changes: false, message: this.SNSErrMessage });
    }

  }
  async addUpgradeStatement(database: string, upgrade: any): Promise<any> {
    if (this.isStarted) {
      return await this.sqlite.addUpgradeStatement({
        database,
        upgrade: [upgrade]
      });
    } else {
      return Promise.resolve({ changes: false, message: this.SNSErrMessage });
    }
  }
}
