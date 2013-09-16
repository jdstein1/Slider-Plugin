    $(function() {
        var $thisSlider = $( "#sliderRange" );
        // Create an array of select elements.
        var select = $thisSlider.find( "select" );
        var $selectLo = $( select ).eq(0).attr( "id", "selectLo" );
        var $selectHi = $( select ).eq(1).attr( "id", "selectHi" );

        var loNew = $selectLo.val();
        var hiNew = $selectHi.val();
        // Add inputs dynamically.
        var $inputLo = $( "<input />" ).addClass( "inputLower" ).attr( "id","inputLo" ).attr( "type","text" ).attr( "value",loNew);
        var $inputHi = $( "<input />" ).addClass( "inputUpper" ).attr( "id","inputHi" ).attr( "type","text" ).attr( "value",hiNew);
        var createSlider = function( $thisSlider, ui ) {
            $thisSlider.find( ".ui-slider-handle" ).eq(0).addClass( "handle" ).attr( "id","handleLo" );
            $thisSlider.find( ".ui-slider-handle" ).eq(1).addClass( "handle" ).attr( "id","handleHi" );
            var $handleLo = $( "#handleLo" );
            var $handleHi = $( "#handleHi" );
            $inputLo.appendTo($handleLo);
            $inputHi.appendTo($handleHi);
        };
        var slider = $thisSlider.slider({
            min : 1,
            max : 20,
            range : true,
//            values: [select[0].value, select[1].value],
            values : [loNew, hiNew],
            create : function( event, ui ) {
                createSlider( $thisSlider, ui );
            },
            start: function( event, ui ) {
            },
            slide: function( event, ui ) {

                // Sliding the LOW value
                // Set the value of the first select element to the first thing in the values array
                select[0].value = ui.values[0];
                console.log( "ui.values0: ", ui.values[0]);
                // Set the value of the first input element to the first thing in the values array
                $inputLo.val(ui.values[0]);
                console.log( "$inputLo.val: ", $inputLo.val());

                // Sliding the HIGH value
                // Set the value of the second select element to the second thing in the values array
                select[1].value = ui.values[1];
                console.log( "ui.values1: ", ui.values[1]);
                // Set the value of the second input element to the second thing in the values array
                $inputHi.val(ui.values[1]);
                console.log( "$inputHi.val: ", $inputHi.val());

            },
            stop: function( event, ui ) {
            },
            change: function( event, ui ) {
            }
        });
        $inputLo.change(function() {
            myChangeEventCallback($inputLo);

            // Set value of low variable to new select option value
//            loNew = this.value;

            // Set low value in values array to new select option value
//            slider.slider( "values", [loNew,hiNew]);

            // Set value of high input to new select option value
//            $selectLo.val(loNew);
        });
        $selectLo.change(function() {
            myChangeEventCallback($selectLo);

            // Set value of low variable to new select option value
//            loNew = this.value;

            // Set low value in values array to new select option value
//            slider.slider( "values", [loNew,hiNew]);

            // Set value of high input to new select option value
//            $inputLo.val(loNew);
        });
        $inputHi.change(function() {
            myChangeEventCallback($inputHi);

            // Set value of high variable to new select option value
//            hiNew = this.value;

            // Set high value in values array to new select option value
//            slider.slider( "values", [loNew,hiNew]);
            
            // Set value of high input to new select option value
//            $selectHi.val(hiNew);
        });
        $selectHi.change( function() {
            myChangeEventCallback($selectHi);

            // Set value of high variable to new select option value
//            hiNew = this.value;

            // Set high value in values array to new select option value
//            slider.slider( "values", [loNew,hiNew]);
            
            // Set value of high input to new select option value
//            $inputHi.val(hiNew);

        });
        var myChangeEventCallback = function( myElement ) {

            var myElementName = $(myElement).attr('id');

            var myElementNameParts = myElementName.split("t");

            if ( myElementNameParts[1]==="Lo" ) {

                // Set value of high variable to new select option value
                loNew = myElement.val();

                // Set low value in values array to new select option value
                slider.slider( "values", [loNew, hiNew] );

                if ( myElementNameParts[0]==="inpu" ) {
                    $selectLo.val(loNew);
                } else if ( myElementNameParts[0]==="selec" ) {
                    $inputLo.val(loNew);
                } else {
                    console.log( "LO error" );
                };
            } else if ( myElementNameParts[1]==="Hi" ) {

                // Set value of high variable to new select option value
                hiNew = myElement.val();

                // Set high value in values array to new select option value
                slider.slider( "values", [loNew, hiNew] );

                if ( myElementNameParts[0]==="inpu" ) {
                    $selectHi.val(hiNew);
                } else if ( myElementNameParts[0]==="selec" ) {
                    $inputHi.val(hiNew);
                } else {
                    console.log( "HI error" );
                };
            } else {
                console.log( "ERROR (Range)" );
            }

        };
    });
