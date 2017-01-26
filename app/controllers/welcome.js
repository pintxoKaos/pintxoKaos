import Ember from 'ember';

export default Ember.Controller.extend({

	firebaseApp: Ember.inject.service(),

	errorMessage: null,

	confirmEmail: false,

	actions: {
		sendEmailVerification() {
				let controller = this;
				const auth = this.get('firebaseApp').auth();
				auth.currentUser.sendEmailVerification().then(function() {
					controller.set('confirmEmail', true);
				});
			},

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
							email: userResponse.email,
							emailVerified: userResponse.emailVerified,
							status: 'PENDING',
							isAdmin: false,
							isActive: true

						});

						controller.set('errorMessage', "Se ha enviado un correo de confirmación.");

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
						this.transitionToRoute('welcome');
						auth.onAuthStateChanged(function(user) {
							if (user.emailVerified) {
								controller.set('errorMessage', 'Email is verified');
								console.log('Email is verified');
							} else {
								controller.set('errorMessage', 'Email is NOT verified');
								console.log('Email is not verified');
							}
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