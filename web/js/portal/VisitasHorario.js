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
            text: 'Registros por Hora da Visita'
        },
        xAxis: {
            categories: [
                '09:00',
                '10:00',
                '11:00',
                '12:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00'
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
        series: [{
            type: 'column',
            name: 'Local 1',
            data: [89, 103, 125, 133, 124, 121, 145, 166, 109]
        }, {
            type: 'column',
            name: 'Local 2',
            data: [92, 123, 144, 153, 174, 152, 167, 180, 131]
        }, {
            type: 'spline',
            name: 'Total',
            data: [181, 226, 269, 286, 298, 273, 312, 346, 240],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }]
    });
}