import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  fecha: DS.attr()
    /*,
      team: DS.hasMany('team')*/

});