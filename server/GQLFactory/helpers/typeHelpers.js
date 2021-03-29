const toCamelCase = require('camelcase');
const { singular } = require('pluralize');
const { pascalCase } = require('pascal-case');
const { typeConversion } = require('./helperFunctions');

/*   Functions facilitating creation of mutation types */
const mutationsHelper = {};

mutationsHelper.create = (tableName, primaryKey, foreignKeys, columns) => {
  return `\n    ${toCamelCase(
    `add_${singular(tableName)}`
  )}(\n${mutationsHelper.mutationFields(
    primaryKey,
    foreignKeys,
    columns,
    false
  )}): ${pascalCase(singular(tableName))}!\n`;
};

mutationsHelper.delete = (tableName, primaryKey) => {
  return `\n    ${toCamelCase(
    `delete_${singular(tableName)}`
  )}(${primaryKey}: ID!): ${pascalCase(singular(tableName))}!\n`;
};

mutationsHelper.update = (tableName, primaryKey, foreignKeys, columns) => {
  return `\n    ${toCamelCase(
    `update_${singular(tableName)}`
  )}(\n${mutationsHelper.mutationFields(
    primaryKey,
    foreignKeys,
    columns,
    true
  )}): ${pascalCase(singular(tableName))}!\n`;
};

mutationsHelper.mutationFields = (
  primaryKey,
  foreignKeys,
  columns,
  primaryKeyRequired
) => {
  let mutationFields = '';
  for (const columnName of Object.keys(columns)) {
    const { dataType, isNullable } = columns[columnName];
    // primaryKeyRequired is used to check whether the primary key is needed for the mutation
    // create mutations do not need primary key as the ID is usually automatically generated by the database
    if (!primaryKeyRequired && columnName === primaryKey) {
      continue;
    }
    // update mutations need the primary key to update the specific field
    // primaryKey fields are ID scalar types
    if (primaryKeyRequired && columnName === primaryKey) {
      mutationFields += `      ${columnName}: ID!,\n`;
      // foreignKey field types are ID scalar types
    } else if (foreignKeys && foreignKeys[columnName]) {
      mutationFields += `      ${columnName}: ID`;
      // if the field is not nullable and for a create mutation type, ! operator is added to the response type
      if (isNullable === 'NO' && !primaryKeyRequired) mutationFields += '!';
      mutationFields += ',\n';
    } else {
      mutationFields += `      ${columnName}: ${
        typeConversion[dataType] ? typeConversion[dataType] : 'Int'
      }`;
      // if the field is not nullable and for a create mutation type, ! operator is added to the response type
      if (isNullable === 'NO' && !primaryKeyRequired) mutationFields += '!';
      mutationFields += ',\n';
    }
  }
  if (mutationFields !== '') mutationFields += '    ';
  return mutationFields;
};

/*   Functions facilitating creation of custom types */
const customHelper = {};

customHelper.getFields = () => {};

customHelper.getRelationships = () => {};

module.exports = {
  mutationsHelper,
  customHelper,
};
