//var url = "http://localhost:8080/api/soda";
var url = "https://mysql-sodaapi.onrender.com/api/soda";

function postRefersco() {

    console.log(url);

    var sodaName = $('#nombre').val();
    var sodaMarca = $('#marca').val();
    var sodaTipo = $('#tipo').val();
    var sodaSabor = $('#sabor').val();
    var sodaTamano = $('#tamano').val();
    var sodaPrecio = $('#precio').val();
    var sodaStock = $('#stock').val();

    var mysoda = {
        nombre: sodaName,
        marca: sodaMarca,
        tipo: sodaTipo,
        sabor: sodaSabor,
        tamano: sodaTamano,
        precio: sodaPrecio,
        stock: sodaStock
    };
    console.log(mysoda);

    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            $('#resultado').html(JSON.stringify(data.refresco));
        },
        data: JSON.stringify(mysoda)
    });
}

function getRefrescos() {
    console.log(url);

    $.getJSON(url, function (json) {
        console.log(json);

        var arrSodas = json.refrescos;

        var htmlTableUsers = '<table border="1">';

        arrSodas.forEach(function (item) {
            console.log(item);
            htmlTableUsers += '<tr>' +
                '<td>' + item.id + '</td>' +
                '<td>' + item.nombre + '</td>' +
                '<td>' + item.marca + '</td>' +
                '<td>' + item.tipo + '</td>' +
                '<td>' + item.sabor + '</td>' +
                '<td>' + item.tamano + '</td>' +
                '<td>' + item.precio + '</td>' +
                '<td>' + item.stock + '</td>' +
                '</tr>';
        });

        htmlTableUsers += '</table>';

        $('#resultado').html(htmlTableUsers);
    });
}
