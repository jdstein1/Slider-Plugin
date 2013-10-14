/*
=-=-=-=-=-=-=-=-=-=-=-=-=
pluginSlider.js

Author : Jeffrey D. Stein
Title : Slider Plugin
Date Created : 2011-May-24

=-=-=-=-=-=-=-=-=-=-=-=-=
*/

(function($) {

    $.fn.doUniSliderSelect = function(options) {
    
        var settings = {
        
            // our plugin settings
            getDataFromInputs : false,
            inputMinClass : 'inputMin',
            inputMaxClass : 'inputMax',
            inputLowerClass : 'inputLower',
            inputUpperClass : 'inputUpper',
            inputSingleClass : 'inputSingle',
            selectMinClass : 'selectMin',
            selectMaxClass : 'selectMax',
            selectLowerClass : 'selectLower',
            selectUpperClass : 'selectUpper',
            selectSingleClass : 'selectSingle',
            log : false,
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
            $mySlider.addClass('uni-slider');
            // console.log($mySlider);

            // Tell us which slider instance we are working with.

            // Fieldset Checker - Make sure all inputs are in a fieldset.
            if ( $mySlider.find('fieldset').length > 0 ) {
                // Find out if a fieldset exists within the slider already.

                // Yes, we already have a fieldset, so...
                // Find all inputs so they can be gathered into my fieldset.

                var $myFieldset = $mySlider.find('fieldset');

                // Input checker
                if ( $mySlider.find('input').length > 0 ) {
                    console.log($mySlider[0].id+' -- inputs!!!!');
                    var $inputAll = $mySlider.find('input');
                    settings.getDataFromInputs = 'input';

                    // Append all inputs to my fieldset.
                    $inputAll.appendTo($myFieldset);

                // Select/Option checker
                } else if ( $mySlider.find('select').length > 0 ) {
                    console.log($mySlider[0].id+' -- selects!!!!');
                    var $selectAll = $mySlider.find('select');
                    settings.getDataFromInputs = 'select';

                    // Append all inputs to my fieldset.
                    $selectAll.appendTo($myFieldset);

                // Error
                } else {
                    console.log($mySlider[0].id+' -- error...');
                }


            } else {
                console.log($mySlider[0].id+' -- no inputs, no selects...');

                // Making a fieldset if it does not exist.
                var $myFieldset = $('<fieldset />');

                // Append fieldset to my slider.
                $myFieldset.appendTo($mySlider);

            };

            console.log('settings.getDataFromInputs: ',settings.getDataFromInputs);
            
            // Get data from inputs and is a range slider.
            if ( settings.getDataFromInputs === 'input' && settings.range === true ) {

                myValues.push( parseInt($mySlider.find('.' + settings.inputLowerClass).val()) );
                myValues.push( parseInt($mySlider.find('.' + settings.inputUpperClass).val()) );
                // Get values of min and max of slider.
                myMin = $mySlider.find('.' + settings.inputMinClass).val();
                myMax = $mySlider.find('.' + settings.inputMaxClass).val();

                // Find the lower and upper value inputs & min and max inputs if we are getting data from inputs.
                var $myInputMinT = $mySlider.find('.' + settings.inputMinClass);
                var $myInputMaxT = $mySlider.find('.' + settings.inputMaxClass);
                var $myInputLower = $mySlider.find('.' + settings.inputLowerClass);
                var $myInputUpper = $mySlider.find('.' + settings.inputUpperClass);

            // Get data from inputs and is NOT a range slider.
            } else if ( settings.getDataFromInputs === 'input' && settings.range !== true ) {

                myValue = parseInt($mySlider.find('.' + settings.inputSingleClass).val());
                // Get values of min and max of slider.
                myMin = $mySlider.find('.' + settings.inputMinClass).val();
                myMax = $mySlider.find('.' + settings.inputMaxClass).val();

                // Find the value input & min and max inputs if we are getting data from inputs.
                var $myInputSingle = $mySlider.find('.' + settings.inputSingleClass);
                var $myInputMinF = $mySlider.find('.' + settings.inputMinClass);
                var $myInputMaxF = $mySlider.find('.' + settings.inputMaxClass);


            // Do nothing here if we are NOT getting data from inputs.
            } else if ( settings.getDataFromInputs !== true && settings.range === true ) {
                // Value or values will be passed in.  Do nothing.

                if ( settings.getDataFromInputs === 'select' ) {
                    myValues.push( $selectAll[0].value );
                    myValues.push( $selectAll[1].value );


                    // Get values of min and max of slider.
                    // var myMinL = $selectAll[0].length;
                    myMin = $selectAll[0][0].value;
                    console.log('MyMin: ',myMin);
                    var myMaxL = $selectAll[1].length;
                    myMax = $selectAll[1][myMaxL-1].value;
                    console.log('myMax: ',myMax);

                    console.log($selectAll);

                    // $selectAll.find('option:nth-child(0)').addClass(settings.selectLowerClass);
                    // $selectAll.find('option:nth-child(myMaxL-1)').addClass(settings.selectUpperClass);
                }

                // Create lower and upper value inputs & min and max inputs if we are passing in data.
                var $myInputLower = $('<input />').addClass(settings.inputLowerClass).attr('type','text').attr('value',myValues[0]);
                var $myInputUpper = $('<input />').addClass(settings.inputUpperClass).attr('type','text').attr('value',myValues[1]);
                var $myInputMinT = $('<input />').addClass(settings.inputMinClass).attr('type','text').attr('value',myMin);
                var $myInputMaxT = $('<input />').addClass(settings.inputMaxClass).attr('type','text').attr('value',myMax);

            } else if ( settings.getDataFromInputs !== true && settings.range !== true ) {
            // Value or values will be passed in.  Do nothing.

                if ( settings.getDataFromInputs === 'select' ) {

                    // myValue = parseInt($mySlider.find('.' + settings.inputSingleClass).val());
                    myValue = $selectAll[0].value;

                    console.log($selectAll);

                    // $selectAll.find('option:nth-child(0)').addClass(settings.selectSingleClass);

                    // Get values of min and max of slider.
                    // var myMinL = $selectAll[0].length;
                    myMin = $selectAll[0][0].value;
                    console.log('myMin: ',myMin);
                    var myMaxL = $selectAll[0].length;
                    myMax = $selectAll[0][myMaxL-1].value;
                    console.log('myMax: ',myMax);
                }

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
                    this.select();
                });
                
                // Do stuff on blur event.
                // Not really needed since the .change() event works.
                /* $mySlider.find('input[type=text]').blur(function( ui ) {
                    $(this).attr( 'value', ui.value );
                }); */

                // Do stuff on change event.
                // OK, this makes the value attribute equal to the value.  But does not make the slider move to the point, like as if the slider was clicked with mouse on a new point.
                $mySlider.find('input[type=text]').change(function() {
                    $(this).attr('value', $(this).val());
                });
                
                // Trigger the change function when change event happens.
                // $mySlider.find('input[type=text]').change(changeSlider);

                // Focus on the text input when the handle is clicked.
                // But I don't want the text input to have focus during and after it is slid (slided?).
                var editSlider = function( $mySlider ) {
                    var $theCurrentHandle = $mySlider.find('.ui-slider-handle');
                    var $myCurrentInput = $theCurrentHandle.find('input[type=text]');
                    $(this).mouseup(function() {
                        $myCurrentInput.focus();
                    });
                };
            };
            
            var startSlider = function( $mySlider, ui ) {
                // Increase opacity to full while sliding to highlight the handle.
                $(ui.handle).children().css({'opacity':'1','filter':'Alpha(Opacity=100)'}); //setter
            };

            var slideSlider = function( $mySlider, ui ) {
                // Update handle with value of input box as it slides.
                // ui.value = $(ui.handle).find('input').attr('value'); //setter

                // Update input box with value of handle as it slides.
                $mySlider.find(ui.handle).find('input').val( ui.value );

            };

            var stopSlider = function( $mySlider, ui ) {
                // Return opacity to normal.
                $(ui.handle).children().css({'opacity':'0.75','filter':'Alpha(Opacity=75)'}); //setter
            };

            var changeSlider = function( $mySlider, ui ) {
                // Update handle with value of input box as it slides.
                ui.value = $(ui.handle).find('input').attr('value'); //setter
                // Update input box with value of handle as it slides.
//              $mySlider.find(ui.handle).find('input').val( ui.value );

//              $mySlider.find('.ui-slider-handle').find('input[type=text]').attr( 'value', $(this).val() );
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
                    createSlider( $mySlider, ui );
                },
                start: function( event, ui ) {
                    // Triggered when clicked
                    startSlider( $mySlider, ui );
                },
                stop: function( event, ui ) {
                    // Triggered when clicked
                    stopSlider( $mySlider, ui );
                },
                slide: function( event, ui ) {
                    // NOT Triggered when clicked
                    slideSlider( $mySlider, ui );
                },
                change: function( event, ui ) {
                    // Triggered when clicked
                    changeSlider( $mySlider, ui );
                }               
        
            });

        });
    
    };

})(jQuery)