import Ember from 'ember';

export default Ember.Controller.extend({

  firebaseApp: Ember.inject.service(),

  cat: {},
  cat4: {},
  cat5: {},
  cat6: {},
  cat7: {},

  numVotos: 0,

  isAdmin: Ember.computed('users',
    function() {
      let email = this.get('firebaseApp').auth().currentUser.uid;
      let admins = this.get('users').filterBy('isAdmin', true);
      //console.log(email);
      for (let i = 0; i < admins.length; i++) {
        //console.log(admins[i].get('uid'));
        if (email === admins[i].get('uid')) {
          //console.log(admins[i].get('uid') + " " + email);
          return true;
        }
      }
      return false;
    }),
  haVotado: Ember.computed('users', 'votos',
    function() {
      //let votantes = this.get('users');
      let votos = this.get('votos');
      let uid = this.get('firebaseApp').auth().currentUser.uid;

      //console.log(email);
      for (let i = 0; i < votos.length; i++) {
        //console.log(admins[i].get('uid'));
        if (uid === votos[i].get('user')) {
          //console.log(admins[i].get('uid') + " " + email);
          return true;
        }
      }
      return false;
    }),

  hanVotado: Ember.computed('users', 'votos',
    function() {
      let votantes = this.get('users');
      let votos = this.get('votos');
      let hanVotado = [];
      for (let i = 0; i < votantes.length; i++) {
        //console.log(votantes[i].get('uid'));
        for (let j = 0; j < votos.length; j++) {
          if (votantes[i].get('uid') === votos[j].get('user')) {
            //console.log(votantes[i].get('uid') + " votó");
            hanVotado.push(votantes[i]);
          }
        }
      }
      return hanVotado;
    }),
  noHanVotado: Ember.computed('users', 'votos',
    function() {
      let votantes = this.get('users');
      let votos = this.get('votos');
      let noHanVotado = [];
      let votado = false;
      for (let i = 0; i < votantes.length; i++) {
        votado = false;
        //console.log(votantes[i].get('uid'));
        for (let j = 0; j < votos.length; j++) {
          if (votantes[i].get('uid') === votos[j].get('user')) {
            //console.log(votantes[i].get('uid') + " votó");
            votado = true;
          }
        }
        if (!votado) {
          noHanVotado.push(votantes[i]);
        }
      }
      return noHanVotado;
    }),
  votantes: 0,

  porcentaje: Ember.computed('numVotos', 'votantes',
    function() {
      this.set('numVotos', this.get('votos').length);
      this.set('votantes', this.get('users').length);
      const currentPercentaje = (this.numVotos * 100) / this.votantes;
      return Math.round(currentPercentaje);
    }),

  onVotos: Ember.observer('votos', 'teams', 'categories', function() {
    let myVotos = this.get('votos');
    let myTeams = this.get('teams');
    let myCategories = this.get('categories');
    if (myCategories && myTeams && myVotos) {
      for (let i = 0; i < myCategories.length; i++) {
        let addCat = myCategories[i].id;
        for (let j = 0; j < myTeams.length; j++) {
          myTeams[j].set(addCat, 0);
        }
      }
      //let cat = this.get('cat');
      for (let i = 0; i < myVotos.length; i++) {
        let voto = myVotos[i];
        for (let i = 0; i < myCategories.length; i++) {
          let addCat = myCategories[i].id;


          let teamName = voto.get(addCat);
          let myTeam = myTeams.filterBy('name', teamName);
          for (let j = 0; j < myTeams.length; j++) {
            //          console.log(teamName + ' ' + myTeams[j].get('name'));
            if (teamName === myTeams[j].get('name')) {
              myTeam = myTeams[j];
              //console.log(myTeam.get('name'));
            }
          }
          myTeam.set(addCat, (myTeam.get(addCat) + 1));
        }
      }
      for (let j = 0; j < myTeams.length; j++) {
        let total = myTeams[j].get('cat1') * 5;
        total = total + (myTeams[j].get('cat2') * 3);
        total = total + myTeams[j].get('cat3');
        myTeams[j].set('total', total);
      }

      //console.log(myTeams);
      this.set('cat', myTeams.sortBy('total', 'cat1', 'cat2', 'cat3').reverse());
      this.set('cat4', myTeams.sortBy('cat4Original', 'total').reverse());
      this.set('cat5', myTeams.sortBy('cat5Emplatado', 'total').reverse());
      this.set('cat6', myTeams.sortBy('cat6Nombre', 'total').reverse());
      this.set('cat7', myTeams.sortBy('cat7Alegato', 'total').reverse());
    }
  })
});