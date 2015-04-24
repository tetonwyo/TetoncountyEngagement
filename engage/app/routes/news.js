import Ember from 'ember';
import Route from 'engage/routes/section-briefs-route';

export default Route.extend({
  model () {
    return Ember.$.getJSON('http://www.tetonwyo.org/data/news.ashx')
      .then(response => response.map(news => {
        return {
          id: news.NewsId,
          title: news.Title,
          date: news.DateEntered,
          media: news.MainImageURL,
          body: news.BriefDescr
        };
      }));
  }
});
