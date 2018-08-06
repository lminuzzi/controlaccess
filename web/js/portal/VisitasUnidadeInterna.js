$( function()
{
    initComponents();
});

function initComponents()
{
    initHighChart();
}

function initHighChart()
{
    $( '#containerGrafico' ).highcharts({
        chart: {
        },
        title: {
            text: 'Registros por Local de Entrada'
        },
        xAxis: {
            categories: [
                'Jan',
                'Fev',
                'Mar',
                'Abr',
                'Mai',
                'Jun',
                'Jul',
                'Ago',
                'Set',
                'Out',
                'Nov',
                'Dez'
            ]
        },
        tooltip: {
            formatter: function() {
                var s;
                if (this.point.name) { // the pie chart
                    s = ''+
                            this.point.name +': '+ this.y +' pessoas';
                } else {
                    s = ''+
                            this.x  +': '+ this.y;
                }
                return s;
            }
        },
        labels: {
            items: [{
                html: 'Total',
                style: {
                    left: '0px',
                    top: '0px',
                    color: 'black'
                }
            }]
        },
        series: [{
            type: 'column',
            name: 'Local 1',
            data: [89, 103, 125, 133, 124, 121, 145, 166, 109, 99, 85, 81]
        }, {
            type: 'column',
            name: 'Local 2',
            data: [92, 123, 144, 153, 174, 152, 167, 180, 131, 118, 105, 97]
        }, {
            type: 'spline',
            name: 'Total',
            data: [181, 226, 269, 286, 298, 273, 312, 346, 240, 217, 200, 178],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }, {
            type: 'pie',
            name: 'Total Geral',
            data: [{
                name: 'Local 1',
                y: 1380,
                color: Highcharts.getOptions().colors[0]
            }, {
                name: 'Local 2',
                y: 1636,
                color: Highcharts.getOptions().colors[1]
            }],
            center: [55, 20],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
    });
}