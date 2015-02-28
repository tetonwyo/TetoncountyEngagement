import DS from 'ember-data';
import fixtures from 'engage/fixtures/tags';

var Tag = DS.Model.extend({
  title: DS.attr(),
  type: DS.attr()
});

Tag.reopenClass({
  FIXTURES: fixtures
});


export default Tag;
