import type { Connection, ConnectionOptions } from 'typeorm';
import TypeORM from 'typeorm';
import { DataSource } from 'typeorm';

import { TestModel } from './models/test-model.js';

function getSqliteConfig(name: string): ConnectionOptions {
  return {
    name,
    type: 'sqlite',
    database: ':memory:',
    entities: [TestModel],
    synchronize: true,
    logging: false,
    dropSchema: true,
  };
}

export const DBConnection = {
  numConnections: 0,

  async create(): Promise<DataSource> {
    const sqliteConf = getSqliteConfig(
      'testConnection' + this.numConnections++
    );
    const dataSource = new DataSource(sqliteConf);

    await dataSource.initialize();

    return dataSource;
  },

  async close(dataSource: DataSource): Promise<void> {
    await dataSource.destroy();
  },

  async clear(dataSource: DataSource): Promise<void> {
    const entities = dataSource.entityMetadatas;

    await dataSource.transaction(async (transactionEntityManager) => {
      for (const entity of entities) {
        const repository = transactionEntityManager.connection.getRepository(
          entity.name
        );

        // Defer foreign key enforcement until transaction commits
        await repository.query('PRAGMA defer_foreign_keys=true');

        // Delete all entries in table
        await repository.query(`DELETE FROM ${entity.tableName}`);
      }
    });
  },
};
