import DS from 'ember-data';
import fixtures from 'engage/fixtures/events';

var Eventz = DS.Model.extend({
  title: DS.attr(),
  start: DS.attr('date'),
  end: DS.attr('date'),
  allDay: DS.attr('boolean'),
  type: DS.attr(),
  source: DS.attr(),
  organization: DS.belongsTo('organization')
});

Eventz.reopenClass({
  FIXTURES: fixtures
});

export default Eventz;
