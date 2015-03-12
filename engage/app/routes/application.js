import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    var take = (howMany =>
      items => items.slice(0, howMany)
    )

    return Ember.RSVP.hash({
      news: this.store.find('news').then(take(2)),
      meetings: this.store.find('meeting').then(take(2)),
      mentions: this.store.find('mention').then(take(4)),
      media: this.store.find('media').then(take(4)),
      related: this.store.find('related').then(take(4))
    });
  }
});
