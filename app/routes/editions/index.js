import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('edition');
  },
  actions: {

    deleteEdition(edition) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        edition.destroyRecord();
      }
    }
  }

});