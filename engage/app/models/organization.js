import DS from 'ember-data';
import fixtures from 'engage/fixtures/organizations';

var Organization = DS.Model.extend({
  title: DS.attr(),
  longTitle: DS.attr(),
  url: DS.attr(),
  source: DS.attr(),
  logoUrl: DS.attr()
});

Organization.reopenClass({
  FIXTURES: fixtures
});

export default Organization;
