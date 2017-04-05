import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    imprime() {
      let ficha = document.getElementById('papeleta');
      let ventimp = window.open(' ', 'popimpr');
      ventimp.document.write(ficha.innerHTML);
      ventimp.document.close();
      ventimp.print();
      ventimp.close();
    }
  }

});