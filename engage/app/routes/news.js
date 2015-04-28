import Ember from 'ember';
import Route from 'engage/routes/section-briefs-route';

export default Route.extend({
  model () {
    return this.store.find('news');
  }
});
