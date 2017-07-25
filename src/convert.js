"use strict";

var questions = require("./questions");

var entities = questions["ACCOUNTS"];

// var transformedEntities = entities.map(entityMapper);

// console.log(JSON.stringify(transformedEntities));
console.log(JSON.stringify(entities.sort(function(a, b) {
                                          return parseInt(a.Instagram.Count) - parseInt(b.Instagram.Count);
                                         })));

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
