import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  /*edition: DS.belongsTo('edition')
    ,
      user: DS.hasMany('user')*/
});