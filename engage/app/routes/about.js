import Route from 'engage/routes/section-briefs-route';

export default Route.extend({
  model ({id='path22'}) {
    return this.store.find('project', id);
  }
});
