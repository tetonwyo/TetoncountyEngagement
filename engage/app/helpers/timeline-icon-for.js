import Ember from 'ember';

export function timelineIconFor(model) {
  switch (model.constructor.typeKey) {
      case 'event':
        return 'assets/images/icon-timeline-calendar.png';
      case 'meeting':
        return 'assets/images/icon-timeline-meetings.png';
      case 'mention':
        return 'assets/images/icon-timeline-mentions.png';
      case 'news':
        return 'assets/images/icon-timeline-news.png';
      case 'media':
        return 'assets/images/icon-timeline-photos.png';
  }
}

export default Ember.Handlebars.makeBoundHelper(timelineIconFor);
