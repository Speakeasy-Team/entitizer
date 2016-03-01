import test from "tape";
import testJson from "./helpers/testJson.json";
import { entitize } from "../src/index";
import map from "lodash/map";
import keys from "lodash/keys";

test("entitizer extracts json", (t) => {
  t.plan(1);

  const actual = entitize(testJson);
  const expected = {
    entities: {
      articles: {
        1: {
          "id": "1",
          "title": "JSON API paints my bikeshed!",
          "body": "The shortest article. Ever.",
          "created": "2015-05-22T14:56:29.000Z",
          "updated": "2015-05-22T14:56:28.000Z",
          "relationships": {
            author: {
              id: "42",
              type: "people"
            },
          },
        },
      },
      people: {
        42: {
          "id": "42",
          "name": "John",
          "age": 80,
          "gender": "male",
          "relationships": {}
        },
      },
      books: {
        3: {
          "id": "3",
          "title": "Hello world",
          "blurb": "It's the greatest",
          "created": "2015-05-22T14:56:29.000Z",
          "updated": "2015-05-22T14:56:28.000Z",
          "relationships": {},
        },
        4: {
          "id": "4",
          "title": "Javascript can be good sometimes",
          "blurb": "and sometimes it hurts",
          "created": "2015-05-22T14:56:29.000Z",
          "updated": "2015-05-22T14:56:28.000Z",
          "relationships": {},
        },
      },
    },
  }

  t.deepEqual(actual, expected);
});

test("entitizer extracts the type", (t) => {
  t.plan(2);
  const response = entitize(testJson);

  t.ok(response.entities.articles);
  t.ok(response.entities.books);
});

test("entitizer sets the entities id to the key", (t) => {
  t.plan(1)
  const response = entitize(testJson);
  const bookIds = keys(response.entities.books);
  const expectedBookIds = ['3', '4'];

  t.deepEqual(bookIds, expectedBookIds);
});

test("entitizer sets the attributes and relationships", (t) => {
  t.plan(1)
  const response = entitize(testJson);
  const article = response.entities.articles[1]
  const expectedArticle = {
    "id": "1",
    "title": "JSON API paints my bikeshed!",
    "body": "The shortest article. Ever.",
    "created": "2015-05-22T14:56:29.000Z",
    "updated": "2015-05-22T14:56:28.000Z",
    "relationships": {
      "author": {
        id: "42",
        type: "people"
      }
    }
  }

  t.deepEqual(article, expectedArticle);
});

test("entitizer sets entities for relationships", (t) => {
  t.plan(1)
  const response = entitize(testJson);

  t.ok(response.entities.people);
});

test("entitizer sets included relationships", (t) => {
  t.plan(1)
  const response = entitize(testJson);

  t.ok(response.entities.people[42])
});
