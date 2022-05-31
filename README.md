# Description

Uses Node v16.13.1

This repo demonstrates the unexpected mutation of an array when it is passed into an insertQueryBuilder to be inserted into a sqlite db.
In this scenario I created an array of 4 objects to be inserted. Each object consist of a message and a date. After the insert, the original array has it's objected mutated. The objects now have their `updatedAt` dates switched. Note this does not happen every single time, so you may need a few runs to get this result.

```js
VALUES BEFORE INSERT [
  // HELLO + T00
  { message: 'hello', updatedAt: 2022-05-31T00:00:00.000Z },
  // WORLD + T05
  { message: 'world', updatedAt: 2022-05-31T05:00:00.000Z },
  // BONJOUR + T10
  { message: 'bonjour', updatedAt: 2022-05-31T10:00:00.000Z },
  // LE MONDE + T15
  { message: 'le monde', updatedAt: 2022-05-31T15:00:00.000Z }
]
VALUES AFTER INSERT [
  // HELLO + T10
  {
    message: 'hello',
    updatedAt: 2022-05-31T10:00:00.000Z,
    id: '43c5c4f4-bde1-4f1f-9e87-32aa941172b1'
  },
  // WORLD + T00
  {
    message: 'world',
    updatedAt: 2022-05-31T00:00:00.000Z,
    id: '592bd027-9889-4ad2-81ee-88e1af378740'
  },
  // BONJOUR + T15
  {
    message: 'bonjour',
    updatedAt: 2022-05-31T15:00:00.000Z,
    id: '68d381ce-e428-4570-960d-34504eefc30b'
  },
  // LE MONDE + T05
  {
    message: 'le monde',
    updatedAt: 2022-05-31T05:00:00.000Z,
    id: '6d9ba257-6705-4433-813b-45b530832700'
  }
]
INSERT RESULTS InsertResult {
  identifiers: [
    { id: '43c5c4f4-bde1-4f1f-9e87-32aa941172b1' },
    { id: '592bd027-9889-4ad2-81ee-88e1af378740' },
    { id: '68d381ce-e428-4570-960d-34504eefc30b' },
    { id: '6d9ba257-6705-4433-813b-45b530832700' }
  ],
  generatedMaps: [
    {
      id: '43c5c4f4-bde1-4f1f-9e87-32aa941172b1',
      updatedAt: 2022-05-31T10:00:00.000Z
    },
    {
      id: '592bd027-9889-4ad2-81ee-88e1af378740',
      updatedAt: 2022-05-31T00:00:00.000Z
    },
    {
      id: '68d381ce-e428-4570-960d-34504eefc30b',
      updatedAt: 2022-05-31T15:00:00.000Z
    },
    {
      id: '6d9ba257-6705-4433-813b-45b530832700',
      updatedAt: 2022-05-31T05:00:00.000Z
    }
  ],
  raw: 4
}
VALUES RETRIEVED FROM DB [
  // HELLO + T00
  TestModel {
    id: '592bd027-9889-4ad2-81ee-88e1af378740',
    message: 'hello',
    updatedAt: 2022-05-31T00:00:00.000Z
  },
  // WORLD + T05
  TestModel {
    id: '6d9ba257-6705-4433-813b-45b530832700',
    message: 'world',
    updatedAt: 2022-05-31T05:00:00.000Z
  },
  // BONJOUR + T10
  TestModel {
    id: '43c5c4f4-bde1-4f1f-9e87-32aa941172b1',
    message: 'bonjour',
    updatedAt: 2022-05-31T10:00:00.000Z
  },
  // LE MONDE + T15
  TestModel {
    id: '68d381ce-e428-4570-960d-34504eefc30b',
    message: 'le monde',
    updatedAt: 2022-05-31T15:00:00.000Z
  }
]
```

## How to Run

```sh
npm install
npm run build
node lib/problem.js
```
