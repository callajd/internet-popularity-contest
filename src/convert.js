"use strict";

var questions = require("./questions");

var entities = questions["ACCOUNTS"];

var transformedEntities = entities.map(entityMapper);

console.log(JSON.stringify(transformedEntities));

function entityMapper(item) {
  var mappedEntity = {
    "id" : "null",
    "name" : {
      "value" : item["name"],
      "synonyms" : []
    }
  };
  return mappedEntity;
}
