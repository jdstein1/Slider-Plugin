/*
=-=-=-=-=-=-=-=-=-=-=-=-=
pluginSlider.js

Author : Jeffrey D. Stein
Title : Slider Plugin
Date Created : 2011-May-24
Last Updated : 2011-Sep-20
Version : 4.0

Notes
=-=-=-=-=-=-=-=-=-=-=-=-=
2011-Sep-26
v/4.1
 - Attempting to add synchronization:  values entered into text inputs updates handle values.
-------------------------
2011-Sep-20
v/4.0
 - Moved code that finds/creates value(s), min, max inputs outside of the create event callback function.
 - Created aliases for settings: '*.value(s)', '*.min', '*.max'.
-------------------------
2011-Aug-17
2011-Sep-19
v/3.9
 - Various edits.
-------------------------
2011-Aug-16
v/3.8
 - Comment out console logging.
-------------------------
2011-Aug-11
v/3.7
 - Added CSS notches to single, lower and upper range inputs.
 - Consolidated some styles using LESS.
-------------------------
2011-Aug-11
v/3.6
 - Optimization help from Kirin Murphy:
 -- Added "parseInt" to lower and upper range input value getters.
 -- General optimization.
-------------------------
2011-Aug-09
v/3.5
 - Added code that inserts min and max inputs if they aren't hard-coded, or sets values of existing min and max inputs.
-------------------------
2011-Aug-09
v/3.4
 - Added code to put all inputs inside a fieldset.
 - Added settings for min and max classes.
-------------------------
2011-Aug-04
v/3.3
 - Never mind.  Seems to already work fine with unique fieldsets.
 - Need to tweak code so it accepts min and max inputs with unique fieldsets.
-------------------------
2011-July-28
v/3.2
 - Playing around with min and max inputs.  These should exist in the code so they don't need to be generated dynamically.
-------------------------
2011-July-26
v/3.1
 - Added code that creates and appends value input(s) to handle(s).
-------------------------
2011-July-12
v/3.0
 - Optimized by Kirin Murphy.
-------------------------
2011-July-12
v/2.0
 - Need to optimize so that data is grabbed from hard coded inputs (if they exist) before the create function runs.
 - Trying to make it a plugin.
-------------------------
2011-June-20
v/1.0
 - Some improvements.
-------------------------
2011-May-24
v/Beta
 - Starting out.  Not a plugin yet.
-------------------------
=-=-=-=-=-=-=-=-=-=-=-=-=
*/

(function($) {

	$.fn.doUniSlider = function(options) {
	
		var settings = {
		
			// our plugin settings
			getDataFromInputs : false,
			inputMinClass : 'inputMin',
			inputMaxClass : 'inputMax',
			inputLowerClass : 'inputLower',
			inputUpperClass : 'inputUpper',
			inputSingleClass : 'inputSingle',
			sliderUnits : 'mile',
			theme : 'default', // potential setting for applying a unique style theme
			readOnly : true, // potential setting for making the inputs read only
			
			// slider specific settings
            range : true,
			value : null,
			values : [],
			disabled : false,
			animate : true,
			max : 100,
			min : 0, 
			orientation : 'horizontal', 
			step : 1

		};

		return this.each(function() {
			
			if (options) { $.extend(settings, options) }
		
			var $mySlider = $(this);
			var myValue = settings.value;
			var myValues = settings.values;
			var myMin = settings.min;
			var myMax = settings.max;

			// Add slider class to $mySlider.
			$mySlider.addClass('slider');

			// Tell us which slider instance we are working with.
//			console.log('::::::::::::::::::');
//			console.log('$mySlider: ', $mySlider.attr('id'));

			// Fieldset Checker - Make sure all inputs are in a fieldset.
			// Find out if a fieldset exists within the slider already.
			if ( $mySlider.find('fieldset').length > 0 ) {

				// Yes, we already have a fieldset, so...
                // Find all inputs so they can be gathered into my fieldset.
				var $inputAll = $mySlider.find('input');
				var $myFieldset = $mySlider.find('fieldset');

                // Append all inputs to my fieldset.
				$inputAll.appendTo($myFieldset);

			} else {

                // Making a fieldset if it does not exist.
				var $myFieldset = $('<fieldset />');

                // Append fieldset to my slider.
				$myFieldset.appendTo($mySlider);

			};
			
			// Get data from inputs and is a range slider.
			if ( settings.getDataFromInputs === true && settings.range === true ) {
//				console.log('range, from inputs...');

				myValues.push( parseInt($mySlider.find('.' + settings.inputLowerClass).val()) );
				myValues.push( parseInt($mySlider.find('.' + settings.inputUpperClass).val()) );
				myMin = $mySlider.find('.' + settings.inputMinClass).val();
				myMax = $mySlider.find('.' + settings.inputMaxClass).val();

				// Find the lower and upper value inputs & min and max inputs if we are getting data from inputs.
				var $myInputMinT = $mySlider.find('.' + settings.inputMinClass);
				var $myInputMaxT = $mySlider.find('.' + settings.inputMaxClass);
				var $myInputLower = $mySlider.find('.' + settings.inputLowerClass);
				var $myInputUpper = $mySlider.find('.' + settings.inputUpperClass);

				// Get data from inputs and is NOT a range slider.
			} else if ( settings.getDataFromInputs === true && settings.range != true ) {
//				console.log('NOT range, from inputs...');

				myValue = parseInt($mySlider.find('.' + settings.inputSingleClass).val());
				myMin = $mySlider.find('.' + settings.inputMinClass).val();
				myMax = $mySlider.find('.' + settings.inputMaxClass).val();

				// Find the value input & min and max inputs if we are getting data from inputs.
				var $myInputSingle = $mySlider.find('.' + settings.inputSingleClass);
				var $myInputMinF = $mySlider.find('.' + settings.inputMinClass);
				var $myInputMaxF = $mySlider.find('.' + settings.inputMaxClass);

			// Do nothing here if we are NOT getting data from inputs.
			} else if ( settings.getDataFromInputs != true && settings.range === true ) {
				// Value or values will be passed in.  Do nothing.
//				console.log('passed in...');

				// Create lower and upper value inputs & min and max inputs if we are passing in data.
				var $myInputLower = $('<input />').addClass(settings.inputLowerClass).attr('type','text').attr('value',myValues[0]);
				var $myInputUpper = $('<input />').addClass(settings.inputUpperClass).attr('type','text').attr('value',myValues[1]);
				var $myInputMinT = $('<input />').addClass(settings.inputMinClass).attr('type','text').attr('value',myMin);
				var $myInputMaxT = $('<input />').addClass(settings.inputMaxClass).attr('type','text').attr('value',myMax);

                } else if ( settings.getDataFromInputs != true && settings.range != true ) {
				// Value or values will be passed in.  Do nothing.
//				console.log('passed in...');

				// Create the value input & min and max inputs if we are passing in data.
				var $myInputSingle = $('<input />').addClass(settings.inputSingleClass).attr('type','text').attr('value',myValue);
				var $myInputMinF = $('<input />').addClass(settings.inputMinClass).attr('type','text').attr('value',myMin);
				var $myInputMaxF = $('<input />').addClass(settings.inputMaxClass).attr('type','text').attr('value',myMax);

			} else {
				// Value or values will be passed in.  Do nothing.
				alert('error');
			};
			
			var createSlider = function( $mySlider, ui ) {

				// Create CSS-based notches for the handle inputs.
				var $notchDown = $('<div />').addClass('sliderNotchDown');
				var $notchUp = $('<div />').addClass('sliderNotchUp');

				// If it's a range slider...
				if ( settings.range === true ) {
					var $myHandleMany = $mySlider.find('.ui-slider-handle');
//						console.log('handles : ', $myHandleMany);

					// Append lower and upper inputs to the handles.
					$myInputLower.appendTo($myHandleMany[0]);
					$myInputUpper.appendTo($myHandleMany[1]);
					$notchDown.appendTo($myHandleMany[0]);
					$notchDown.clone().appendTo($myHandleMany[1]);

					// Append min and max inputs to the fieldset.
					$myInputMinT.attr('disabled', 'disabled').appendTo($myFieldset);
					$myInputMaxT.attr('disabled', 'disabled').appendTo($myFieldset);

				// If it's a min or max only slider...
				} else {
					var $myHandleSingle = $mySlider.find('.ui-slider-handle');

					// Append input to the handle.
					$myInputSingle.appendTo($myHandleSingle);
					$notchDown.appendTo($myHandleSingle);

					// Append min and max inputs to the fieldset.
					$myInputMinF.attr('disabled', 'disabled').appendTo($myFieldset);
					$myInputMaxF.attr('disabled', 'disabled').appendTo($myFieldset);

				};

				// Reduce opacity to normal.
				$mySlider.find('.ui-slider-handle').children().css({'opacity':'0.75','filter':'Alpha(Opacity=75)'});
				
				// Select all text inside input on focus event.
				$mySlider.find('input[type=text]').focus(function( ui ) {
					console.log('i have focussed: ', $(this).attr('class'), $(this).attr('value'), $(this).val());
					this.select();
				});
				
				// Do stuff on blur event.
                // Not really needed since the .change() event works.
				/* $mySlider.find('input[type=text]').blur(function( ui ) {
					console.log('i have blurred 1: ', $(this).attr('class'), $(this).attr('value'), $(this).val());
                    $(this).attr( 'value', ui.value );
					console.log('i have blurred 2: ', $(this).attr('class'), $(this).attr('value'), $(this).val());
				}); */

				// Do stuff on change event.
                // OK, this makes the value attribute equal to the value.  But does not make the slider move to the point, like as if the slider was clicked with mouse on a new point.
                $mySlider.find('input[type=text]').change(function() {
					console.log('i changed 1: ', $(this).attr('class'), $(this).attr('value'), $(this).val());
                    $(this).attr('value', $(this).val());
					console.log('i changed 2: ', $(this).attr('class'), $(this).attr('value'), $(this).val());
				});
                
                // Trigger the change function when change event happens.
//                $mySlider.find('input[type=text]').change(changeSlider);

				// Focus on the text input when the handle is clicked.
				// But I don't want the text input to have focus during and after it is slid (slided?).
				var editSlider = function( $mySlider ) {
                    var $theCurrentHandle = $mySlider.find('.ui-slider-handle');
                    var $myCurrentInput = $theCurrentHandle.find('input[type=text]');
                    $(this).mouseup(function() {
                        console.log('i have click.focus 1: ', $myCurrentInput.attr('class'), $myCurrentInput.attr('value'));
                        $myCurrentInput.focus();
                        console.log('i have click.focus 2: ', $myCurrentInput.attr('class'), $myCurrentInput.attr('value'));
                    });
                };
			};
			
			var startSlider = function( $mySlider, ui ) {
				// Increase opacity to full while sliding to highlight the handle.
				$(ui.handle).children().css({'opacity':'1','filter':'Alpha(Opacity=100)'}); //setter
//						console.log('ui.handle : ', ui.value);
			};

			var slideSlider = function( $mySlider, ui ) {
				// Update handle with value of input box as it slides.
//				ui.value = $(ui.handle).find('input').attr('value'); //setter
				// Update input box with value of handle as it slides.

//				console.log('ui.handle : ', ui.handle);
//				console.log('-----');
//				console.log('ui.value: ', ui.value);
//				console.log('input val',$mySlider.find(ui.handle).find('input').val());
//				console.log('$(ui.handle) : ', $(ui.handle));
//				console.log('mySlider.find ui.handle : ', $mySlider.find(ui.handle));

				$mySlider.find(ui.handle).find('input').val( ui.value );

//				console.log('ui.value: ', ui.value);
//				console.log('input val',$mySlider.find(ui.handle).find('input').val());
//				console.log('ui.handle : ', ui.value);
			};

			var stopSlider = function( $mySlider, ui ) {
				// Return opacity to normal.
				$(ui.handle).children().css({'opacity':'0.75','filter':'Alpha(Opacity=75)'}); //setter
//						console.log('ui.handle : ', ui.value);
			};

			var changeSlider = function( $mySlider, ui ) {
				console.log('i am changing!: ', $mySlider.find('.ui-slider-handle').find('input[type=text]'));
				// Update handle with value of input box as it slides.
				console.log('ui.value 1: ', ui.value);
				ui.value = $(ui.handle).find('input').attr('value'); //setter
				console.log('ui.value 2: ', ui.value);
				// Update input box with value of handle as it slides.
//				$mySlider.find(ui.handle).find('input').val( ui.value );

//				$mySlider.find('.ui-slider-handle').find('input[type=text]').attr( 'value', $(this).val() );
			};

			$mySlider.slider({
				disabled: settings.disabled,
				animate: settings.animate,
				max: myMax,
				min: myMin, 
				orientation: settings.orientation,
				range: settings.range,
				step: settings.step,
				value: myValue,
				values: myValues,
				create: function( event, ui ) {
//					console.log('-CREATE event triggered');
					createSlider( $mySlider, ui );
				},
				start: function( event, ui ) {
					// Triggered when clicked
					console.log('-START event triggered');
					startSlider( $mySlider, ui );
				},
				stop: function( event, ui ) {
					// Triggered when clicked
		            console.log('-STOP event triggered');
					stopSlider( $mySlider, ui );
				},
				slide: function( event, ui ) {
					// NOT Triggered when clicked
		            console.log('-SLIDE event triggered');
					slideSlider( $mySlider, ui );
				},
				change: function( event, ui ) {
					// Triggered when clicked
		            console.log('-CHANGE event triggered');
					changeSlider( $mySlider, ui );
				}				
		
			});

		});
	
	};

})(jQuery)

//$(document).ready(function() {

//});