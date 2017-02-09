import Ember from 'ember';

export default Ember.Route.extend({

    model() {
        return Ember.RSVP.hash({
            editions: this.store.findAll('edition').then(results => results.sortBy('fecha')),
            //books: this.store.findAll('book'),
            //authors: this.store.findAll('author')
        });
    },

    setupController(controller, model) {
        controller.set('editions', model.editions);
        //controller.set('books', model.books);
        //controller.set('authors', model.authors);
    }
});