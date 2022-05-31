import { DBConnection } from './db-connection.js';
import { TestModel } from './models/test-model.js';

const main = async () => {
  const connection = await DBConnection.create();

  const modelA: Partial<TestModel> = {
    message: 'hello',
    updatedAt: new Date('2022-05-31T00:00:00.000Z'),
  };
  const modelB: Partial<TestModel> = {
    message: 'world',
    updatedAt: new Date('2022-05-31T05:00:00.000Z'),
  };
  const modelC: Partial<TestModel> = {
    message: 'bonjour',
    updatedAt: new Date('2022-05-31T10:00:00.000Z'),
  };
  const modelD: Partial<TestModel> = {
    message: 'le monde',
    updatedAt: new Date('2022-05-31T15:00:00.000Z'),
  };

  const values = [modelA, modelB, modelC, modelD];

  console.log('VALUES BEFORE INSERT', values);

  const insertResults = await connection
    .getRepository(TestModel)
    .createQueryBuilder()
    .insert()
    .into(TestModel)
    .values(values)
    .execute();

  console.log('VALUES AFTER INSERT', values);
  console.log('INSERT RESULTS', insertResults);

  const inDB = await connection
    .getRepository(TestModel)
    .createQueryBuilder('testModel')
    .getMany();

  console.log('VALUES RETRIEVED FROM DB', inDB);

  await DBConnection.close(connection);
};

main();
