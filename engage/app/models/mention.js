import DS from 'ember-data';
import LinkModel from 'engage/models/link';

export default LinkModel.extend({
  source: DS.attr('string')
});
