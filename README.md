#JSON API Entitizer

This library was created because consuming a [JSON API](http://jsonapi.org/)
spec API can be a pain in the ass; especially while following Redux practices.
The library is designed to receive JSON API spec JSON and transform it to a
specific format following a similar pattern as
[normalizr](https://github.com/Speakeasy-Team/entitizer).

##Installing
To install using npm run:

`$ npm install json-api-entitizer --save`

##Entitizing:

the `entitize(json)` function will transform this json:
```
{
  "data": [{
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON API paints my bikeshed!",
      "body": "The shortest article. Ever.",
      "created": "2015-05-22T14:56:29.000Z",
      "updated": "2015-05-22T14:56:28.000Z"
    },
    "relationships": {
      "author": {
        "data": {"id": "42", "type": "people"}
      }
    }
  },
  {
    "type": "books",
    "id": "3",
    "attributes": {
      "title": "Hello world",
      "blurb": "It's the greatest",
      "created": "2015-05-22T14:56:29.000Z",
      "updated": "2015-05-22T14:56:28.000Z"
    }
  },
  {
    "type": "books",
    "id": "4",
    "attributes": {
      "title": "Javascript can be good sometimes",
      "blurb": "and sometimes it hurts",
      "created": "2015-05-22T14:56:29.000Z",
      "updated": "2015-05-22T14:56:28.000Z"
    }
  }],
  "included": [
    {
      "type": "people",
      "id": "42",
      "attributes": {
        "name": "John",
        "age": 80,
        "gender": "male"
      }
    }
  ]
}
```

into this:

```
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
```
