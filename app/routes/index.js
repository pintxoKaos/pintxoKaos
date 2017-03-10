import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      editions: this.store.findAll('edition').then(results => results.sortBy('fecha')),
      teams: this.store.findAll('team').then(results => results.sortBy('edition')),
      pintxos: this.store.findAll('pintxo'),
      categories: this.store.findAll('category')
    });
  },

  setupController(controller, model) {
    controller.set('editions', model.editions);
    controller.set('teams', model.teams);
    controller.set('pintxos', model.pintxos);
    controller.set('categories', model.categories);
  }
});