import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.createRecord('edition');
  },

  actions: {

    saveEdition(newEdition) {
      let modelo = newEdition.get('data');

      //console.log(modelo.get('fecha'));
      //console.log(modelo.get('name'));
      console.log(newEdition.get('data'));
      newEdition.save().then(() => this.transitionTo('editions'));
    },

    willTransition() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this.controller.get('model').rollbackAttributes();
    }
  }
});