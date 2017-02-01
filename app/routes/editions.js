import Ember from 'ember';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

	beforeModel() {
		if (this.get('session')) {
			this.get('session').fetch('password').catch((error) => {
				this.set('errorMessage', error);
        this.transitionTo('sign-in');
			});
//			console.log(this.get('firebaseApp').auth().currentUser);
		}
	},
	afterModel() {
/*		if (this.get('session')) {
			console.log(this.get('firebaseApp').auth().currentUser);
		}
    */
	}
});
