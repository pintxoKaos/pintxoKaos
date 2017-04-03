import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),
  myVote: { "edition": "edition3", "user": "", "cat1": "", "cat2": "", "cat3": "", "cat4Original": "", "cat5Emplatado": "", "cat6Nombre": "", "cat7Alegato": "" },
  haVotado: Ember.computed('users', 'votos',
    function() {
      //let votantes = this.get('users');
      let votos = this.get('votos');
      let uid = this.get('firebaseApp').auth().currentUser.uid;

      //console.log(email);
      for (let i = 0; i < votos.length; i++) {
        //console.log(votos[i].get('user') + '-------------' + uid);
        if (uid === votos[i].get('user')) {
          console.log(votos[i].get('user') + " HA VOTADO " + this.get('firebaseApp').auth().currentUser.displayName);
          return true;
        }
      }
      return false;
    }),
  actions: {
    vota() {
      console.log("votando...");
      console.log(this.get('myVote'));
      const newVoto = this.store.createRecord('voto', this.get('myVote'));
      console.log(newVoto);
      newVoto.save();
      console.log("salvando voto...");
      this.transitionToRoute('index');
    },
    votoParcial(parcial) {
      console.log(parcial);
      let votoParcial = parcial.split('.');
      this.set('myVote.user', votoParcial[0]);
      this.set('myVote.' + votoParcial[1], votoParcial[2]);
      console.log(votoParcial[0]);
      console.log(votoParcial[1]);
      console.log(votoParcial[2]);
      console.log(this.get('myVote'));
    }
  }
});