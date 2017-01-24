import Ember from 'ember';

export default Ember.Controller.extend({
	firebase: Ember.inject.service(),
	actions: {

		signUp() {
				let controller = this;
				this.get('firebase').
				auth().
				createUserWithEmailAndPassword(this.get('email'), this.get('password')).
				catch(function(error) {
					console.log(error.code + " XXX " + error.message);
				});
				controller.set('email', null);
				controller.set('password', null);
				controller.transitionToRoute('sign-in');
			},

			signUp2() {
				let controller = this;
				this.get('firebase').createUser({
					email: this.get('email') || '',
					password: this.get('password') || '',
				}, (error, data) => {
					if (error) {
						console.log(error);
					} else {
						controller.set('email', null);
						controller.set('password', null);
						controller.transitionToRoute('sign-in');
					}
				});
			}
	}
});