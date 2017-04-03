import DS from 'ember-data';

export default DS.Model.extend({
  edition: DS.attr('string'),
  user: DS.attr('string'),
  cat1: DS.attr('string'),
  cat2: DS.attr('string'),
  cat3: DS.attr('string'),
  cat4Original: DS.attr('string'),
  cat5Emplatado: DS.attr('string'),
  cat6Nombre: DS.attr('string'),
  cat7Alegato: DS.attr('string')
});