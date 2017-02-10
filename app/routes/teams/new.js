import Ember from 'ember';

export default Ember.Route.extend({

    model(params) {
        return this.store.createRecord('team', params.edition);
    },

    actions: {

        saveTeam(newTeam) {
            newTeam.save().then(() => this.transitionTo('teams'));
        },

        willTransition() {
            // rollbackAttributes() removes the record from the store
            // if the model 'isNew'
            this.controller.get('model').rollbackAttributes();
        }
    }
});