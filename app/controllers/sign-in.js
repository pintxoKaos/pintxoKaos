import Ember from 'ember';

export default Ember.Controller.extend({

	firebaseApp: Ember.inject.service(),

	errorMessage: null,

	actions: {
		signIn(provider) {
				let controller = this;
				const auth = this.get('firebaseApp').auth();

				this.get('session').open('firebase', {
					provider: provider,
					email: this.get('email') || '',
					password: this.get('password') || '',
				}).then((user) => {
					controller.set('email', null);
					controller.set('password', null);
					controller.transitionToRoute('welcome');
					//console.log(user.currentUser);
					const currentUser = user.currentUser;
					console.log(currentUser);
					auth.onAuthStateChanged(function(currentUser) {
						if (currentUser) {
							if (currentUser.emailVerified) {
								controller.set('errorMessage', "El email está validado");
							} else {
								controller.set('errorMessage', "El email NO está validado");
							}
						}
					});

				}, (error) => {
					controller.set('errorMessage', error);
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
				/*				let controller = this;
								const auth = this.get('firebaseApp').auth();
								let provider = this.get('firebaseApp').auth().GoogleAuthProvider();
								auth.signInWithPopup(provider).then(function(result) {
									// This gives you a Google Access Token. You can use it to access the Google API.
									var token = result.credential.accessToken;
									// The signed-in user info.
									var user = result.user;
									// ...
								}).catch(function(error) {
									// Handle Errors here.
									var errorCode = error.code;
									var errorMessage = error.message;
									// The email of the user's account used.
									var email = error.email;
									// The firebase.auth.AuthCredential type that was used.
									var credential = error.credential;
									controller.set('errorMessage', error);
								});
				*/
			}

	}
});