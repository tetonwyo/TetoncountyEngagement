import DS from 'ember-data';
import LinkModel from 'engage/models/link';

export default LinkModel.extend({
  body: DS.attr('string')
});
