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
                        BirthDate: { type: "string" },
                        Age: { type: "number" },
                        Presente: { type: "string" }
                    }
                }
            },
            pageSize: 15,
            group: {
                field: "Cargo", aggregates: [
                    { field: "FirstName", aggregate: "count" },
                    { field: "Age", aggregate: "sum"},
                    { field: "Age", aggregate: "average"  }
                ]
            },

            aggregate: [ { field: "FirstName", aggregate: "count" },
                { field: "Age", aggregate: "sum" },
                { field: "Age", aggregate: "average" },
                { field: "Age", aggregate: "min" },
                { field: "Age", aggregate: "max" }]
        },
        height: 360,
        sortable: true,
        scrollable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            { field: "FirstName", title: "Nome", footerTemplate: "Total Final: #=count#", groupFooterTemplate: "Total: #=count#" },
            { field: "LastName", title: "Sobrenome" },
            { field: "Presente", title: "Localiza&ccedil;&atilde;o" },
            {
                field: "Age", title: "Idade", groupFooterTemplate: "M&eacute;dia: #=average#",
                footerTemplate: "<div class=left><div>Min: #= min #</div><div>Max: #= max #</div><div>M&eacute;dia Final: #=average#</div></div>"
            }
        ]
    });
}