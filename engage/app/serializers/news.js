import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalize (type, news) {
    return {
        id: news.NewsId,
        title: news.Title,
        date: news.DateEntered,
        media: news.MainImageURL,
        body: news.BriefDescr
    };
  }
});
