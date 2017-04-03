import Ember from 'ember';

export default Ember.Route.extend({

  firebaseApp: Ember.inject.service(),

  beforeModel() {
    console.log("before model controller");
    if (this.get('session.isAuthenticated')) {
      const auth = this.get('firebaseApp').auth();
      const user = auth.currentUser;
      this.set('currentUser', user);
      //this.set('myVote.user', user);
      console.log("user1: " + user.displayName);
      console.log("user2: " + this.get('currentUser').displayName);
      console.log("email: " + this.get('currentUser').email);
      //console.log("voto user: " + this.get('myVote').user);
      //console.log("voto user: " + this.get('myVote.user').email);
    }
  },

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
  },

  filteredUsers: function() {
    return this.store.findAll('user').then(results => results.sortBy('team')).property('user.@each');
  },

});