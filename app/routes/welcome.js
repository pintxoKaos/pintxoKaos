import Ember from 'ember';

export default Ember.Route.extend({
	user: null,
	beforeModel() {
		if (this.get('session')) {
			this.get('session').fetch('password').catch((error) => {
				this.set('errorMessage', error);
			});
			this.set('user', this.get('session').currentUser);
			//console.log(this.get('user'));
		}
	}
});