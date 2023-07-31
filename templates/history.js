setTimeout(function () {
    var tempHist = document.getElementById("tempHist").getContext("2d");
    var chartTemp = new Chart(tempHist, {
        type: 'line',
        data: {
            labels: [""],
            datasets: [{
                label: "Temperatuur",
                data: [],
                pointRadius: 1
            }],
        },
        options: {
            responsive: false,
            scales: {
                y: {
                    //min: 23.0,
                    //max: 27.0,
                    title: {
                        display: true,
                        text: 'graden Celsius'
                    },
                    ticks: {
                        stepSize: 0.5,
                        precision: 1,
                        autoSkip: false
                    }
                },
                x: {
                    ticks: {
                        callback: function(val, index) {
                            return index % 5 === 0 ? this.getLabelForValue(val) : '';
                        }
                    },
                    title: {
                        display: true,
                        text: 'tijd'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    var humHist = document.getElementById("humHist").getContext("2d");
    var chartHum = new Chart(humHist, {
        type: 'line',
        data: {
            labels: [""],
            datasets: [{
                label: "Luchtvochtigheid",
                data: [],
                pointRadius: 1
            }],
        },
        options: {
            responsive: false,
            scales: {
                y: {
                    //min: 40.0,
                    //max: 70.0,
                    title: {
                        display: true,
                        text: 'procent'
                    },
                    ticks: {
                        stepSize: 0.5,
                        precision: 1,
                        autoSkip: false
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'tijd'
                    },
                    ticks: {
                        callback: function(val, index) {
                            return index % 5 === 0 ? this.getLabelForValue(val) : '';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    setInterval(function() {
        // ADJUST TO UPDATE chartTemp AND chartHum!!!
        $.get('/live', function (response) {
            if (response[1] > 0) {
                chartTemp.data.labels.push(response[0]);
                chartTemp.data.datasets[0].data.push(response[1]);
                chartTemp.update();
            };

            if (chartTemp.data.datasets[0].data.length == 200) {
                chartTemp.data.datasets[0].data.shift();
            };

            if (chartTemp.data.labels.length == 200) {
                chartTemp.data.labels.shift();
            };

            if (response[2] < 100000) {
                chartHum.data.labels.push(response[0]);
                chartHum.data.datasets[0].data.push(response[2]);
                chartHum.update();
            };

            if (chartHum.data.datasets[0].data.length == 200) {
                chartHum.data.datasets[0].data.shift();
            };

            if (chartHum.data.labels.length == 200) {
                chartHum.data.labels.shift();
            };
        });
    }, 3000)
}, 7000);
