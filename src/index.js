import reduce from "lodash/reduce";
import merge from "lodash/merge";
import has from "lodash/has";

export function entitize(json) {
  let entities = {};
  entities = reduceData(entities, json.data);
  entities = reduceData(entities, json.included);
  return { entities };
}

function reduceData(entities, data) {
  return merge({}, entities, reduce(data, (result, item) => {
    const { id, type, relationships, attributes } = item;

    result = createMisingType(result, type);
    result = setRecord(result, type, id, attributes);
    result = setRelationships(result, type, id, relationships);

    return result;
  }, {}));
}

function createMisingType(entities, type) {
  if (has(entities, type)) {
    return entities;
  } else {
    return merge({}, entities, entities[type] = {});
  }
}

function setRecord(result, type, id, attributes) {
  const newRecord = {
    [type]: { [id]: merge({}, {id: id}, attributes) }
  };

  return merge({}, result, newRecord);
}

function setRelationships(entities, type, id, relationships) {
  const newRelationships = reduce(relationships, (result, relationship, key) => {
    return { [key]: relationship.data };
  }, {});

  const data = {
    [type]: {
      [id]: {
        relationships: newRelationships
      }
    }
  };

  return merge({}, entities, data);
}
