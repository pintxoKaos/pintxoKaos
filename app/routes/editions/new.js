import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.createRecord('edition');
  },

  actions: {

    saveEdition(newEdition) {
      newEdition.save().then(() => this.transitionTo('editions'));
    },

    willTransition() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this.controller.get('model').rollbackAttributes();
    }
  }
});