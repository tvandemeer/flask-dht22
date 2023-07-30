setTimeout(function () {
    var chrt = document.getElementById("tempHist").getContext("2d");
    var chartId = new Chart(chrt, {
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
                    min: 22.0,
                    max: 28.0,
                    title: {
                        display: true,
                        text: 'graden Celsius'
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
    setInterval(function() {
        $.get('/live', function (response) {
            if (response[1] > 0) {
                chartId.data.labels.push(response[0]);
                chartId.data.datasets[0].data.push(response[1]);
                chartId.update();
            };
            if (chartId.data.datasets[0].data.length == 100) {
                chartId.data.datasets[0].data.shift();
                chartId.data.labels.shift();
            };
        });
    }, 3000)
}, 5000);


// Humidity history graph
setTimeout(function () {
    var chrt = document.getElementById("humHist").getContext("2d");
    var chartId = new Chart(chrt, {
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
                    min: 30.0,
                    max: 70.0,
                    title: {
                        display: true,
                        text: '%'
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
        $.get('/live', function (response) {
            if (response[2] < 100000) {
                chartId.data.labels.push(response[0]);
                chartId.data.datasets[0].data.push(response[2]);
                chartId.update();
            };
            if (chartId.data.datasets[0].data.length == 100) {
                chartId.data.datasets[0].data.shift();
                chartId.data.labels.shift();
            };
        });
    }, 3000)
}, 7000);
