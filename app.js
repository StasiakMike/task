function showResponseTime(time) {
    $('#responseTime').html(time);
}

$('#btnRun0').click(function() {

    $('#txtContinent').html("?");

    $.ajax({
        url: "getCountryInfo.php",
        type: "POST",
        dataType: "JSON",
        data: {
            country: "GB",
            // country: $('#selCountry') .val(),
            lang: "en",
            // lang:    $('#selLanguage').val()
        },
        success: function(result) {
            console.log(JSON.stringify(result));
            if (result.status.code == 200) {
                $('#txtContinent')  .html(result['data'][0]['continentName']);
                $('#txtName')       .html(result['data'][0]['countryName']);
                $('#txtCapital')    .html(result['data'][0]['capital']);
                $('#txtLanguages')  .html(result['data'][0]['languages']);
                $('#txtPopulation') .html(result['data'][0]['population']);
                $('#txtArea')       .html(result['data'][0]['areaInSqKm']);
                showResponseTime(result.status.returnedIn);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus  + " - " + errorThrown);
        }
    });

});

// ======== check Time Zone =========================================
$('#btnRun1').click(function() {

    // console.log("btnRun1.onClick():");
    // console.log($('#selLat1').val() + " " + $('#selLan1').val());
    $('#txtCName').html("?");
    $('#txtCode').html("?");
    $('#txtTime').html("?");
    $('#txtTimeZone').html("?");
    $('#txtGMT').html("?");

    $.ajax({
        url: "getTimeZone.php",
        type: "POST",
        dataType: "JSON",
        data: {
            latitude:  $('#selLat1').val(),
            langitude: $('#selLan1').val()
        },
        success: function(result) {
            console.log(JSON.stringify(result));
            if (result.status.code == 200) {
                $('#txtCName')      .html(result['data']['countryName']);
                $('#txtCode')       .html(result['data']['countryCode']);
                $('#txtTime')       .html(result['data']['time']);
                $('#txtTimeZone')   .html(result['data']['timezoneId']);
                $('#txtGMT')        .html(result['data']['gmtOffset']);
                showResponseTime(result.status.returnedIn);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus  + " - " + errorThrown);
        }
    });

});

// ======== check Ocean =============================================
$('#btnRun2').click(function() {

    $('#txtStatus2').html("");

    $.ajax({
        url: "getOcean.php",
        type: "POST",
        dataType: "JSON",
        data: {
            latitude:  $('#selLat2').val(),
            langitude: $('#selLan2').val()
        },
        success: function(result) {
            console.log(JSON.stringify(result));
            if (result.status.code == 200) {
                if ('status' in result.data)
                    $('#txtStatus2')    .html(result.data.status.message);
                else {
                    $('#txtOceanName')  .html(result['data']['name']);
                    $('#txtGeocode')    .html(result['data']['geonameId']);
                    $('#txtDistance')   .html(result['data']['distance']);
                }
                showResponseTime(result.status.returnedIn);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus  + " - " + errorThrown);
        }
    }); 

});


// ======== check ICAO Weather ======================================
$('#btnRun3').click(function() {

    $('#txtStatus3').html("");

    $.ajax({
        url: "getWeather.php",
        type: "POST",
        dataType: "JSON",
        data: {
            station: $('#selStation').val()
        },
        success: function(result) {
            console.log(JSON.stringify(result));
            if (result.status.code == 200) {
                if ('status' in result.data)
                    // $('#txtStatus3')     .html(result['data']['status']['message']);
                    $('#txtStatus3')    .html(result.data.status.message);
                else {
                    wo = result.data.weatherObservation;
                    // $('#txtStation')    .html(result['data']['weatherObservation']['stationName']);
                    $('#txtStation')    .html(wo.stationName);
                    $('#txtClouds')     .html(wo.clouds);
                    // $('#txtTemperature').html(result['data']['weatherObservation']['temperature']);
                    $('#txtTemperature').html(result.data.weatherObservation.temperature);
                    $('#txtWind')       .html(result['data']['weatherObservation']['windSpeed']);
                    // $('#txtDateTime')   .html(result['data']['datetime']);
                    $('#txtDateTime')   .html(result.data.weatherObservation.datetime);
                }
                showResponseTime(result.status.returnedIn);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus  + " - " + errorThrown);
        }
    }); 

});
