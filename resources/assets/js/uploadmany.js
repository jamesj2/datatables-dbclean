$(document).ready(function() {
    let editor = new $.fn.dataTable.Editor( {
        ajax: "/datatable/uploadmany",
        table: "#uploadmany",
        template: "#editForm",
        fields: [ {
                label: "Name:",
                name: "u.name"
            }, {
                label: "Email:",
                name: "u.email"
            }, {
                label: "Images:",
                name: "files[].id",
                type: "uploadMany",
                display: function ( fileId, counter ) {
                    return '<img src="'+editor.file( 'files', fileId ).web_path+'"/>';
                },
                noFileText: 'No images'
            }
        ]
    } );

    let options = {
        ajax: {
            url: '/datatable/uploadmany',
            type: "POST"
        },
        columns: [
            { data: "u.id" },
            { data: "u.name" },
            { data: "u.email" },
            {
                data: "files",
                render: function ( d ) {
                    return d.length ?
                        d.length+' image(s)' :
                        'No image';
                },
                title: "Image"
            }
        ],
        orderCellsTop: true,
        fixedHeader: true,
        pageLength: 25,
        select: true,
        serverSide: false,
        stateSave: false,
        buttons: [
            { extend: "create", editor: editor },
            { extend: "edit",   editor: editor },
            { extend: "remove", editor: editor }
        ]
    };

    const table = $("#uploadmany").DataTable(options);

    // Display the buttons
    new $.fn.dataTable.Buttons( table, [
        { extend: "create", editor: editor },
        { extend: "edit",   editor: editor },
        { extend: "remove", editor: editor }
    ] );

    table.buttons().container()
        .appendTo( $('.col-md-6:eq(0)', table.table().container() ) );

});

