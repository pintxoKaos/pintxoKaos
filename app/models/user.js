import DS from 'ember-data';

export default DS.Model.extend({
  displayName: DS.attr('string'),
  uid: DS.attr('string'),
  email: DS.attr('string'),
  emailVerified: DS.attr('boolean'),
  status: DS.attr('string'),
  isAdmin: DS.attr('boolean'),
  isActive: DS.attr('boolean')
});