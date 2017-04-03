import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  hour: DS.attr('string'),
  edition: DS.attr('string'),
  pintxo: DS.belongsTo('pintxo'),
  user: DS.hasMany('user')
});