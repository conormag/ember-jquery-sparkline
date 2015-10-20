import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

module('Acceptance | spark line', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /spark-line', function(assert) {
  visit('/spark-line');

  andThen(function() {
    assert.equal(currentURL(), '/spark-line');
  });
});
