import Ember from 'ember';

export default Ember.Route.extend({

    model() {
        //return this.store.findAll('edition');
        return this.store.findAll('edition').then(results => results.sortBy('fecha'));
    },

    actions: {

        deleteEdition(edition) {
            let confirmation = confirm('Are you sure?');

            if (confirmation) {
                //edition.destroyRecord();
                edition.destroyRecord().then(() => this.transitionTo('index'));
            }
        }
    }

});