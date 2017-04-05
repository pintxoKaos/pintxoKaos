import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      editions: this.store.findAll('edition').then(results => results.sortBy('fecha')),
      teams: this.store.findAll('team').then(results => results.sortBy('hour')),
      pintxos: this.store.findAll('pintxo').then(results => results.sortBy('team')),
      users: this.store.findAll('user').then(results => results.sortBy('team')),
      categories: this.store.findAll('category').then(results => results.sortBy('id')),
      votos: this.store.findAll('voto').then(results => results.sortBy('id'))
    });
  },

  setupController(controller, model) {
    controller.set('editions', model.editions);
    controller.set('teams', model.teams);
    controller.set('pintxos', model.pintxos);
    controller.set('users', model.users);
    controller.set('categories', model.categories);
    controller.set('votos', model.votos);
  }
});