import Ember from 'ember';

export default Ember.Route.extend({

    model() {
        return this.store.findAll('team').then(results => results.sortBy('edition'));
    },

    actions: {

        deleteTeam(team) {
            let confirmation = confirm('Are you sure?');

            if (confirmation) {
                //edition.destroyRecord();
                team.destroyRecord().then(() => this.transitionTo('index'));
            }
        }
    }

});