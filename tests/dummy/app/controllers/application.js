import Ember from 'ember';

export default Ember.Controller.extend({
  // needs: [],
  data: [1,9,2,9,3,9,4,9,1,7,8,9,6,7,8,6,7,9,8],
  chart: [1,9,1,9,1,9,1,9],
  tristate: [1,1,0,1,-1,-1,1,-1,0,0,1,1],
  bullet: [10,12,12,9,7],

  actions: {
  	chartClicked: function(sparkline) {
			var region = sparkline.getCurrentRegionFields();
			console.log("Clicked on x="+region.x+" y="+region.y);
  	},
  	chartHover: function(sparkline) {
			var region = sparkline.getCurrentRegionFields();
			console.log("Hovered on x="+region.x+" y="+region.y);
  	}
  }
});
