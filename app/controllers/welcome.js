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
			basicUpdateUser() {
				let controller = this;
				controller.set('errorMessage', "Actualizando...");
				const auth = this.get('firebaseApp').auth();
				auth.currentUser.updateProfile({
					displayName: "fores jar",
					photoURL: "https://lh6.googleusercontent.com/-wJesWg7UKEM/AAAAAAAAAAI/AAAAAAAAAd8/vlXlVp5pt2w/photo.jpg?sz=64"
				}).then(function() {
					controller.set('errorMessage', "Perfil actualizado");
				}, function(error) {
					controller.set('errorMessage', error);
				});
			}
	}
});