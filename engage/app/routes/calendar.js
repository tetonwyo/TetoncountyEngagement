import Route from 'engage/routes/section-briefs-route';

export default Route.extend({
  model () {
    return this.store.find('event').then(events => events.slice(0, 10));
  }
});
