import Ember from 'ember';

export default Ember.Route.extend({
	errorMessage: null,
	beforeModel() {
		if (this.get('session')) {
			this.get('session').fetch('password').catch((error) => {
				this.set('errorMessage', error);
			});
		}
	},

	actions: {
		accessDenied() {
			this.transitionTo('/');
		},
	},

});