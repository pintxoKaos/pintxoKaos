import Ember from 'ember';

export default Ember.Route.extend({
	errorMessage: null,

	moment: Ember.inject.service(),

	beforeModel() {
		if (this.get('session')) {
			this.get('session').fetch('password').catch((error) => {
				this.set('errorMessage', error);
			});
		}
		this.get('moment').setLocale('es');
		this.get('moment').setTimeZone('Spain/Madrid');
	},

	actions: {
		accessDenied() {
			this.transitionTo('/');
		},
	},

});