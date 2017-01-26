import Ember from 'ember';

export default Ember.Controller.extend({

	firebaseApp: Ember.inject.service(),

	errorMessage: null,

	actions: {
		signIn(provider) {
				let controller = this;
				this.get('session').open('firebase', {
					provider: provider,
					email: this.get('email') || '',
					password: this.get('password') || '',
				}).then(() => {
					controller.set('email', null);
					controller.set('password', null);
					controller.transitionToRoute('welcome');
				}, (error) => {
					console.log(error);
				});
			},

			sendPasswordReset() {
				var email = this.get('email');
				let controller = this;
				controller.set('errorMessage', "Reseteando...");
				const auth = this.get('firebaseApp').auth();

				// [START sendpasswordemail]
				auth.sendPasswordResetEmail(email).then(function() {
					controller.set('errorMessage', "Enviado correo de reseteo");
				}).catch(function(error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					// [START_EXCLUDE]
					if (errorCode === 'auth/invalid-email') {
						controller.set('errorMessage', "Correo no válido");
					} else if (errorCode === 'auth/user-not-found') {
						controller.set('errorMessage', "Correo no encontrado");
					} else {
						controller.set('errorMessage', errorMessage);
					}
				});
			},

			googleSignIn() {
				let controller = this;
				this.get('session').open('firebase', {
					provider: 'GoogleAuthProvider'
				}).then(() => {
					controller.set('email', null);
					controller.set('password', null);
					controller.transitionToRoute('welcome');
				}, (error) => {
					console.log(error);
				});
			}

	}
});