import Ember from 'ember';

export default Ember.Controller.extend({

	firebaseApp: Ember.inject.service(),

	errorMessage: null,

	confirmEmail: false,

	nick: null,

	photoURL: null,

	actions: {
		sendEmailVerification() {
				let controller = this;
				const auth = this.get('firebaseApp').auth();
				auth.currentUser.sendEmailVerification().then(function() {
					controller.set('confirmEmail', true);
				});
			},
			basicUpdateUser() {
				let controller = this;
				controller.set('errorMessage', "Actualizando...");
				const auth = this.get('firebaseApp').auth();
				auth.currentUser.updateProfile({
					displayName: controller.get('nick') || auth.currentUser.displayName,
					photoURL: controller.get('photoURL') || auth.currentUser.photoURL
				}).then(function() {
					controller.set('errorMessage', "Perfil actualizado");
				}, function(error) {
					controller.set('errorMessage', error);
				});
			},
			signOut() {
				this.get('session').close();
				this.transitionToRoute('/');
			}
		}
});