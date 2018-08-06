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
    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
        return {
            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });
    $( '#containerGrafico' ).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Registros Por Tipo de Pessoa'
        },
        subtitle: {
            text: ''
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
        yAxis: {
            min: 0,
            title: {
                text: 'Quantidade'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y} pessoas</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                cursor: 'pointer'
            }
        },
        series: [{
            name: 'Civil',
            data: [5, 7, 9, 12, 6, 15, 4, 7, 18, 16, 6, 1]

        }, {
            name: 'Militar',
            data: [127, 122, 193, 210, 235, 215, 246, 237, 289, 261, 196, 145]
        }]
    });
    $( '#containerGrafico2' ).highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Porcentagem por Tipo de Pessoa'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.2f} %'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Porcentagem',
            data: [
                {
                    name: 'Civil',
                    y: 4.11,
                    sliced: true,
                    selected: true
                },
                ['Militar',    95.89]
            ]
        }]
    });
}