import Ember from 'ember';

export default Ember.Route.extend({
	isAdding: false,

	model() {
		return this.store.findAll('festival');
	},

	actions: {

		editFestival(festival) {
				festival.set('isEditing', true);
			},
			addFestival() {
				this.toggleProperty('isAdding');
				console.log(this.get('isAdding'));
			},

			cancelFestivalEdit(festival) {
				festival.set('isEditing', false);
				festival.set('isAdding', false);
				festival.rollbackAttributes();
			},

			saveFestival(festival) {

				if (festival.get('isNotValid')) {
					return;
				}

				festival.set('isEditing', false);
				festival.set('isAdding', false);
				festival.save();
			}
	}
});