$( function()
{
    initComponents();
});

function initComponents()
{
    initTextArea();
    initMaps();
}

function initMaps()
{
    var addresspicker = $( "#addresspicker" ).addresspicker();
    var addresspickerMap = $( "#addresspicker_map" ).addresspicker({
        regionBias: "fr",
        updateCallback: showCallback,
        elements: {
            map:      "#map",
            lat:      "#lat",
            lng:      "#lng",
            street_number: '#street_number',
            route: '#route',
            locality: '#locality',
            administrative_area_level_2: '#administrative_area_level_2',
            administrative_area_level_1: '#administrative_area_level_1',
            country:  '#country',
            postal_code: '#postal_code',
            type:    '#type'

        },
        reverseGeocode: true
    });

    var gmarker = addresspickerMap.addresspicker( "marker");
    gmarker.setVisible(true);
    addresspickerMap.addresspicker( "updatePosition");
    /*$('#reverseGeocode').change(function(){
        $("#addresspicker_map").addresspicker("option", "reverseGeocode", ($(this).val() === 'true'));
    });*/

    function showCallback(geocodeResult, parsedGeocodeResult){
        $('#callback_result').text(JSON.stringify(parsedGeocodeResult, null, 4));
    }
}

function initTextArea()
{
    $( 'textarea' ).kendoEditor();
}