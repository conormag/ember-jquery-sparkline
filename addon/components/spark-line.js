import Ember from 'ember';
import layout from '../templates/components/spark-line';

const { on } = Ember;

export default Ember.Component.extend({
	layout: layout,
  tagName: 'div',

  classNames: ['sparkline'],


  initialize: on('didInsertElement', function() {

  	var sparkline;

    let properties = this.getProperties(
    	'type',								// - There are 7 types of sparkline, selected by supplying a "type" option of 'line' (default),
														//  'bar', 'tristate', 'bullet', 'discrete', 'pie' or 'box'
			'lineColor', 					// - Color of the line used for the chart
			'fillColor', 					// - Color used to fill in the chart', // - Set to '' or false for a transparent chart
			'width', 							// - Width of the chart  - Defaults to 3 times the number of values in pixels
			'height', 						// - Height of the chart - Defaults to the height of the containing element
			'chartRangeMin', 			// - Specify the minimum value to use for the Y range of the chart - Defaults to the minimum value supplied
			'chartRangeMax', 			// - Specify the maximum value to use for the Y range of the chart - Defaults to the maximum value supplied
			'chartRangeClip', 		// - Clip out of range values to the max/min specified by chartRangeMin and chartRangeMax
			'chartRangeMinX', 		// - Specify the minimum value to use for the X range of the chart - Defaults to the minimum value supplied
			'chartRangeMaxX', 		// - Specify the maximum value to use for the X range of the chart - Defaults to the maximum value supplied
			'composite', 					// - If true then don't erase any existing chart attached to the tag, but draw
														//        another chart over the top - Note that width and height are ignored if an
														//        existing chart is detected.
			'tagValuesAttribute', // - Name of tag attribute to check for data values - Defaults to 'values'
			'enableTagOptions', 	// - Whether to check tags for sparkline options
			'tagOptionsPrefix', 	// - Prefix used for options supplied as tag attributes - Defaults to 'spark'
			'disableHiddenCheck', // - If set to true, then the plugin will assume that charts will never be drawn into a
														//        hidden dom element, avoding a browser reflow
			'disableInteraction', // - If set to true then all mouseover/click interaction behaviour will be disabled,
														//    making the plugin perform much like it did in 1.x
			'disableTooltips', 		// - If set to true then tooltips will be disabled - Defaults to false (tooltips enabled)
			'disableHighlight', 	// - If set to true then highlighting of selected chart elements on mouseover will be disabled
														//    defaults to false (highlights enabled)
			'highlightLighten', 	// - Factor to lighten/darken highlighted chart values by - Defaults to 1.4 for a 40% increase
			'tooltipContainer', 	// - Specify which DOM element the tooltip should be rendered into - defaults to document.body
			'tooltipClassname', 	// - Optional CSS classname to apply to tooltips - If not specified then a default style will be applied
			'tooltipOffsetX', 		// - How many pixels away from the mouse pointer to render the tooltip on the X axis
			'tooltipOffsetY', 		// - How many pixels away from the mouse pointer to render the tooltip on the r axis
			'tooltipFormatter ', 	// - Optional callback that allows you to override the HTML displayed in the tooltip
														//    callback is given arguments of (sparkline, options, fields)
			'tooltipChartTitle', 	// - If specified then the tooltip uses the string specified by this setting as a title
			'tooltipFormat', 			// - A format string or SPFormat object  (or an array thereof for multiple entries)
														//    to control the format of the tooltip
			'tooltipPrefix', 			// - A string to prepend to each field displayed in a tooltip
			'tooltipSuffix', 			// - A string to append to each field displayed in a tooltip
			'tooltipSkipNull', 		// - If true then null values will not have a tooltip displayed (defaults to true)
			'tooltipValueLookups',// - An object or range map to map field values to tooltip strings
														//		'(eg. to map -1 to "Lost", 0 to "Draw", and 1 to "Win")
			'numberFormatter', 		// - Optional callback for formatting numbers in tooltips
			'numberDigitGroupSep',// - Character to use for group separator in numbers "1,234" - Defaults to ","
			'numberDecimalMark', 	// - Character to use for the decimal point when formatting numbers - Defaults to "."
			'numberDigitGroupCount',// - Number of digits between group separator - Defaults to 3

			// - Line chart.  Options:
			//-------------------------
			'spotColor', 					// - Set to '' to not end each line in a circular spot
			'minSpotColor', 			// - If set, color of spot at minimum value
			'maxSpotColor', 			// - If set, color of spot at maximum value
			'spotRadius', 				// - Radius in pixels
			'lineWidth', 					// - Width of line in pixels
			'normalRangeMin',
			'normalRangeMax', 		// - If set draws a filled horizontal bar between these two values marking the "normal"
														//               or expected range of values
			'normalRangeColor', 	// - Color to use for the above bar
			'drawNormalOnTop', 		// - Draw the normal range above the chart fill color if true
			'defaultPixelsPerValue', // - Defaults to 3 pixels of width for each value in the chart
			'highlightSpotColor', // - The color to use for drawing a highlight spot on mouseover', // - Set to null to disable
			'highlightLineColor', // - The color to use for drawing a highlight line on mouseover', // - Set to null to disable
			'valueSpots', 				// - Specify which points to draw spots on, and in which color.  Accepts a range map

			// - Bar chart.  Options:
			//-------------------------
			'barColor', 					// - Color of bars for postive values
			'negBarColor', 				// - Color of bars for negative values
			'zeroColor', 					// - Color of bars with zero values
			'nullColor', 					// - Color of bars with null values', // - Defaults to omitting the bar entirely
			'barWidth', 					// - Width of bars in pixels
			'colorMap', 					// - Optional mappnig of values to colors to override the *BarColor values above
														//           can be an Array of values to control the color of individual bars or a range map
														//           to specify colors for individual ranges of values
			'barSpacing', 				// - Gap between bars in pixels
			'zeroAxis', 					// - Centers the y-axis around zero if true

			// - Tristate: Charts values of win (>0), lose (<0) or draw (=0)
			//-------------------------
			'posBarColor', 				// - Color of win values
			'negBarColor', 				// - Color of lose values
			'zeroBarColor', 			// - Color of draw values
			'barWidth', 					// - Width of bars in pixels
			'barSpacing', 				// - Gap between bars in pixels
			'colorMap', 					// - Optional mappnig of values to colors to override the *BarColor values above
														//'           can be an Array of values to control the color of individual bars or a range map
														//'           to specify colors for individual ranges of values
			//'discrete' - Options:
			//-------------------------
			'lineHeight', 				// - Height of each line in pixels - Defaults to 30% of the graph height
			'thesholdValue', 			// - Values less than this value will be drawn using thresholdColor instead of lineColor
			'thresholdColor',

			//'bullet' - Values for bullet graphs msut be in the order: target, performance, range1, range2, range3, ...
			//-------------------------
			'targetColor', 				// - The color of the vertical target marker
			'targetWidth', 				// - The width of the target marker in pixels
			'performanceColor', 	// - The color of the performance measure horizontal bar
			'rangeColors', 				// - Colors to use for each qualitative range background color

			// - Pie chart. Options:
			//-------------------------
			'sliceColors', 				// - An array of colors to use for pie slices
			'offset', 						// - Angle in degrees to offset the first slice', // - Try -90 or +90
			'borderWidth', 				// - Width of border to draw around the pie chart, in pixels', // - Defaults to 0 (no border)
			'borderColor', 				// - Color to use for the pie chart border', // - Defaults to #000

			// - Box plot. Options:
			//-------------------------
			'raw', 								// - Set to true to supply pre-computed plot points as values
														//'      values should be: low_outlier, low_whisker, q1, median, q3, high_whisker, high_outlier
														//'      When set to false you can supply any number of values and the box plot will
														//'      be computed for you.  Default is false.
			'showOutliers', 			// - Set to true (default) to display outliers as circles
			'outlierIQR', 				// - Interquartile range used to determine outliers.  Default 1.5
			'boxLineColor', 			// - Outline color of the box
			'boxFillColor', 			// - Fill color for the box
			'whiskerColor', 			// - Line color used for whiskers
			'outlierLineColor', 	// - Outline color of outlier circles
			'outlierFillColor', 	// - Fill color of the outlier circles
			'spotRadius', 				// - Radius of outlier circles
			'medianColor', 				// - Line color of the median line
			'target' 							// - Draw a target cross hair at the supplied value (default undefined)
    );

		let data = this.get('data');
		sparkline = this.$().sparkline(data, properties);

		var _this = this;
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
