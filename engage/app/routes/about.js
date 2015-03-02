import Ember from 'ember';

export default Ember.Route.extend({
  model ({id='path22'}) {
    return this.store.find('project', id);
  }
});
