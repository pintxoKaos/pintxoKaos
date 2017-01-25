import Ember from 'ember';

export default Ember.Controller.extend({

	firebaseApp: Ember.inject.service(),

	email: null,

	password: null,

	errorMessage: null,

	actions: {

		createUser() {
			let controller = this;
			controller.set('errorMessage', "Registrando...");
			const auth = this.get('firebaseApp').auth();
			auth.createUserWithEmailAndPassword(
				this.get('email'),
				this.get('password')).
			then((userResponse) => {
					console.log(userResponse);
					const user = this.store.createRecord('user', {
						uid: userResponse.uid,
						alias: userResponse.alias,
						email: userResponse.email
					});
					//this.transitionToRoute('welcome');

					this.get('session').open('firebase', {
						provider: 'password',
						email: this.get('email') || '',
						password: this.get('password') || '',
					}).then(() => {
						controller.set('email', null);
						controller.set('password', null);
						controller.transitionToRoute('welcome');
					}, (error) => {
						controller.set('errorMessage', error);
					});

					return user.save();
				},
				function(error) {
					if (error) {
						controller.set('errorMessage', error);
						controller.set('email', null);
						controller.set('password', null);
					}
				}

			);
		}
	}
});