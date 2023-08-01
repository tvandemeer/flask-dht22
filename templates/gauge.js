var tempGauge = new JustGage({
    id: "temp",
    value: 0,
    min: 23,
    max: 27,
    decimals: 1,
    gaugeWidthScale: 0.6,
    label: 'Temperatuur (graden Celsius)'
});

var humGauge = new JustGage({
    id: "hum",
    value: 0,
    min: 0,
    max: 100,
    decimals: 0,
    gaugeWidthScale: 0.6,
    label: 'Luchtvochtigheid (%)'
});

setInterval(function () {
    $.get('/live', function (response) {
        if (response[1] > 0) {
            tempGauge.refresh(response[1]);
        };
        if (response[2] >= 0 && response[2] < 100000) {
            humGauge.refresh(response[2]);
        };
        //console.log(String(response[1]) + ' / ' + String(response[2]));
    });
}, 3000);
