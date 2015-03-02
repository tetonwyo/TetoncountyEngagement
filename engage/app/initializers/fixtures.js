import EventFixtures   from 'engage/fixtures/event';
import EventModel   from 'engage/models/event';
import MediaFixtures   from 'engage/fixtures/media';
import MediaModel   from 'engage/models/media';
import MeetingFixtures from 'engage/fixtures/meeting';
import MeetingModel from 'engage/models/meeting';
import MentionFixtures from 'engage/fixtures/mention';
import MentionModel from 'engage/models/mention';
import NewsFixtures    from 'engage/fixtures/news';
import NewsModel    from 'engage/models/news';
import ProjectFixtures from 'engage/fixtures/project';
import ProjectModel from 'engage/models/project';
import RelatedFixtures from 'engage/fixtures/related';
import RelatedModel from 'engage/models/related';

export function initialize() {
  RelatedModel.reopenClass({
    FIXTURES: RelatedFixtures
  });
  EventModel.reopenClass({
    FIXTURES: EventFixtures
  });
  MediaModel.reopenClass({
    FIXTURES: MediaFixtures
  });
  MeetingModel.reopenClass({
    FIXTURES: MeetingFixtures
  });
  MentionModel.reopenClass({
    FIXTURES: MentionFixtures
  });
  NewsModel.reopenClass({
    FIXTURES: NewsFixtures
  });
  ProjectModel.reopenClass({
    FIXTURES: ProjectFixtures
  });
}

export default {
  name: 'fixtures',
  initialize: initialize,
  before: 'store'
};
