# Description

Uses Node v16.13.1

This repo demonstrates the unexpected mutation of an array when it is passed into an insertQueryBuilder to be inserted into a sqlite db.
In this scenario I created an array of 2 objects to be inserted. Each object consist of a message and a date. After the insert, the original array has been mutated. The objects now have their `updatedAt` dates switched. Note this does not happen every single time, so you may need a few runs to get this result.

```js
VALUES BEFORE INSERT [
  { message: 'hello', updatedAt: 2022-05-31T00:00:00.000Z }, // HELLO + T00:00
  { message: 'world', updatedAt: 2022-05-31T10:00:00.000Z }  // WORLD + T10:00
]
VALUES AFTER INSERT [
  // HELLO + T10:00
  {
    message: 'hello',
    updatedAt: 2022-05-31T10:00:00.000Z,
    id: '124b8afa-e7ea-4371-a672-2aa7c5969de4'
  },
  // WORLD + T00:00
  {
    message: 'world',
    updatedAt: 2022-05-31T00:00:00.000Z,
    id: '7ee13ae7-f6c9-46d7-b7f4-1c35da62e7d0'
  }
]
INSERT RESULTS InsertResult {
  identifiers: [
    { id: '124b8afa-e7ea-4371-a672-2aa7c5969de4' },
    { id: '7ee13ae7-f6c9-46d7-b7f4-1c35da62e7d0' }
  ],
  generatedMaps: [
    {
      id: '124b8afa-e7ea-4371-a672-2aa7c5969de4',
      updatedAt: 2022-05-31T10:00:00.000Z
    },
    {
      id: '7ee13ae7-f6c9-46d7-b7f4-1c35da62e7d0',
      updatedAt: 2022-05-31T00:00:00.000Z
    }
  ],
  raw: 2
}
VALUES RETRIEVED FROM DB [
  // HELLO + T00:00
  TestModel {
    id: '7ee13ae7-f6c9-46d7-b7f4-1c35da62e7d0',
    message: 'hello',
    updatedAt: 2022-05-31T00:00:00.000Z
  },
  // WORLD + T10:00
  TestModel {
    id: '124b8afa-e7ea-4371-a672-2aa7c5969de4',
    message: 'world',
    updatedAt: 2022-05-31T10:00:00.000Z
  }
]
```

## How to Run

```sh
npm install
npm run build
node lib/problem.js
```
