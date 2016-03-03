import test from "tape";
import { findAssociated, findById } from "../src/index";

const store = {
  entities: {
    articles: {
      1: {
        "id": "1",
        "relationships": {
          author: {
            id: "42",
            type: "people",
          },
        },
      },
      2: {
        "id": "1",
        "relationships": {
          authors: [
            {
              id: "42",
              type: "people",
            },
            {
              id: "43",
              type: "people",
            },
          ],
        },
      },
    },
    people: {
      42: {
        "id": "42",
        "name": "John",
        "age": 80,
        "gender": "male",
        "relationships": {},
      },
      43: {
        "id": "43",
        "name": "Sarah",
        "age": 30,
        "gender": "female",
        "relationships": {},
      },
    },
  },
};

test("findAssocation finds a list of related association", (t) => {
  t.plan(1);

  const actual = findAssociated(store, "articles", 1, "author");
  const expected = {
    "id": "42",
    "name": "John",
    "age": 80,
    "gender": "male",
    "relationships": {},
  };

  t.deepEqual(actual, expected);
});

test("findAssociated returns {} if it doesn't find anything", (t) => {
  t.plan(1);

  const actual = findAssociated(store, "articles", 1, "people");
  const expected = {};

  t.deepEqual(actual, expected);
});

test("findAssociated returns multiple assocations", (t) => {
  t.plan(1);

  const actual = findAssociated(store, "articles", 2, "authors");
  const expected = [
    {
      "id": "42",
      "name": "John",
      "age": 80,
      "gender": "male",
      "relationships": {},
    },
    {
      "id": "43",
      "name": "Sarah",
      "age": 30,
      "gender": "female",
      "relationships": {},
    },
  ];

  t.deepEqual(actual, expected);
});

test("findById(store, resourceType, id) finds an entity by id", (t) => {
  t.plan(1);

  const actual = findById(store, "articles", 1);
  const expected = {
    "id": "1",
    "relationships": {
      author: {
        id: "42",
        type: "people",
      },
    },
  };

  t.deepEqual(actual, expected);
});

test("findById returns null when it fails to find it", (t) => {
  t.plan(1);

  const actual = findById(store, "foo", 1);
  const expected = {};

  t.deepEqual(actual, expected);
});
