    $(function() {
        var $thisSlider = $( "#sliderMinMax" );
        var $thisSliderSelect = $thisSlider.find( "select" );
        var $thisSliderOptions = $thisSliderSelect.find( "option" );

        // console.log('$thisSliderSelect: ',$thisSliderSelect);
        // console.log('$thisSliderSelect.val(): ',$thisSliderSelect.val());
        // console.log('$thisSliderSelect.find(\'option\'): ',$thisSliderSelect.find('option'));
        // console.log('$thisSliderSelect.find(\'option\').val(): ',$thisSliderSelect.find('option').val());

    var array = $thisSliderOptions.map(
        function() {
            console.log('this: ',this);
            return [$.map($(this).data(), function(v) {
                return v;
            })];
        }
    ).get();

    console.log(array);

        var thisSliderValue = $thisSliderSelect.val();

        var $inputMinMax = $thisSlider.find( "input" );
        $inputMinMax.attr( "value", thisSliderValue);

        var createSlider = function( $thisSlider, ui ) {
            $thisSlider.find( ".ui-slider-handle" ).addClass( "handle" ).attr( "id","handleMinMax" );
            var $handleMinMax = $( "#handleMinMax" );
            $inputMinMax.appendTo($handleMinMax);
        };
        var slider = $thisSlider.slider({
            min : 1,
            max : 20,
            range : "max",
            value : $thisSliderSelect[0].value,
            create : function( event, ui ) {
                createSlider( $thisSlider, ui );
            },
            slide : function( event, ui ) {
                $thisSliderSelect[0].value = ui.value;
                $inputMinMax.val(ui.value);
            }
        });
        $( "#selectMinMax" ).change(function() {
            thisSliderValue = this.value;
//            slider.slider( "value", this.selectedIndex + 1 );
            slider.slider( "value", thisSliderValue );
            $inputMinMax.val(thisSliderValue);
        });
        $( "#inputMinMax" ).change(function() {
            thisSliderValue = this.value;
//            slider.slider( "value", this.selectedIndex + 1 );
            slider.slider( "value", thisSliderValue );
            $thisSliderSelect.val(thisSliderValue);
        });
    });