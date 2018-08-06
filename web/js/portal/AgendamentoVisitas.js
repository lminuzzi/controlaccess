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
    $( '#containerGrafico' ).kendoGrid({
        dataSource: {
            data: createRandomData(50),
            schema:{
                model: {
                    fields: {
                        Id: { type: "number" },
                        FirstName: { type: "string" },
                        LastName: { type: "string" },
                        Cargo: { type: "string" },
                        Data: { type: "string" },
                        Hora: { type: "string" },
                        Presente: { type: "string" }
                    }
                }
            },
            pageSize: 15,
            group: {
                field: "Dia", aggregates: [
                    { field: "FirstName", aggregate: "count" }
                ]
            },

            aggregate: [ { field: "Dia", aggregate: "count" }]
        },
        height: 360,
        sortable: true,
        scrollable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            { field: "FirstName", title: "Nome"/*, footerTemplate: "Total Final: #=count#", groupFooterTemplate: "Total: #=count#"*/ },
            { field: "LastName", title: "Sobrenome" },
            { field: "Hora", title: "Hora" }
        ]
    });
}