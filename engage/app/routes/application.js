import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    showSidebar() {
      this.controller.set('showSidebar', true);
    },
    hideSidebar() {
      this.controller.set('showSidebar', false);
    }
  }
});
