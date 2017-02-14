import Ember from 'ember';

const eqarray = (params) => params[0] === (params[1] - 1);
export default Ember.Helper.helper(eqarray);