import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      events: this.store.find('event').then(events => events.sortBy('title')),
      tags: this.store.find('tag').then(tags => tags.sortBy('name')),
      organizations: this.store.find('organization').then(organizations => organizations.sortBy('title', 'start', 'end'))
    });
  }
});
