import DS from 'ember-data';

export default DS.Model.extend({
  alias: DS.attr(),
  uid: DS.attr(),
  email: DS.attr()
});
