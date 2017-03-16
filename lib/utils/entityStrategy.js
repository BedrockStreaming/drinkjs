'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.entityStrategy = undefined;

var _draftJs = require('draft-js');

var entityStrategy = exports.entityStrategy = function entityStrategy(entityType) {
  return function (contentBlock, callback) {
    contentBlock.findEntityRanges(function (character) {
      var entityKey = character.getEntity();
      return entityKey !== null && entityType === _draftJs.Entity.get(entityKey).getType();
    }, callback);
  };
};