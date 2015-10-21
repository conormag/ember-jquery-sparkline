import Ember from 'ember';
import layout from '../templates/components/spark-line';

const { on } = Ember;

export default Ember.Component.extend({
	layout: layout,
  tagName: 'div',

  classNames: ['sparkline'],


  initialize: on('didInsertElement', function() {

  	var sparkline,
  			_this = this;

  	let options = this.get('options') || {};
		let data = this.get('data');
		sparkline = this.$().sparkline(data, options);

		this.$().bind('sparklineClick', function(ev) {
    	_this.set('sparklineClick', ev.sparklines[0]);
		});
		this.$().bind('sparklineRegionChange', function(ev) {
    	_this.set('sparklineRegionChange', ev.sparklines[0]);
		});
  }),

	click() {
		this.sendAction('action',this.get('sparklineClick'));
	},

  mouseMove() {
  	if (this.get('hover')) {
  		let sp = this.get('sparklineRegionChange');
	  	if (sp) {
		    this.sendAction('hover', sp);
	  	}
  	}
  },

  destroySparkline: on('willDestroyElement', function() {
    this.destroy();
  }),
});
