import Ember from 'ember';

export default Ember.Controller.extend({

	firebaseApp: Ember.inject.service(),

	email: null,

	password: null,

	actions: {

		createUser(email, pass) {
	    const auth = this.get('firebaseApp').auth();
	    auth.createUserWithEmailAndPassword(this.get('email'), this.get('password')).then((userResponse) => {
	      const user = this.store.createRecord('user', {
	        uid: userResponse.uid,
					alias: userResponse.email,
					email: userResponse.email
	      });
	      return user.save();
	    });
	  },

		signUp() {
				let controller = this;
				this.get('firebaseApp').
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
				this.get('firebaseApp').createUser({
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
