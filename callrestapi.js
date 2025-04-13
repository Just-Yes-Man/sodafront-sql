var url = "http://localhost:8080/api/soda";
//var url = "https://mysql-sodaapi.onrender.com/api/soda";

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

function editarRefresco(id) {
    $.getJSON(url + '/' + id, function (data) {
        const refresco = data.refresco;

        if (refresco) {
            $('#nombre').val(refresco.nombre);
            $('#marca').val(refresco.marca);
            $('#tipo').val(refresco.tipo);
            $('#sabor').val(refresco.sabor);
            $('#tamano').val(refresco.tamano);
            $('#precio').val(refresco.precio);
            $('#stock').val(refresco.stock);

            $('#btn-update').show().data('id', id);
        } else {
            alert('Refresco no encontrado.');
        }
    });
}


function updateRefresco() {
    const id = $('#btn-update').data('id'); // ID almacenado

    var mysoda = {
        nombre: $('#nombre').val(),
        marca: $('#marca').val(),
        tipo: $('#tipo').val(),
        sabor: $('#sabor').val(),
        tamano: $('#tamano').val(),
        precio: $('#precio').val(),
        stock: $('#stock').val()
    };

    $.ajax({
        url: url + '/' + id,
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(mysoda),
        success: function (data) {
            alert('Refresco actualizado');
            $('#btn-update').hide();
            getRefrescos();
        },
        error: function (err) {
            alert('Error al actualizar refresco');
            console.error(err);
        }
    });
}



function getRefrescos() {
    console.log(url);

    $.getJSON(url, function (json) {
        console.log(json);

        var arrSodas = json.refrescos;

        var htmlTableUsers = '<table border="1">' +
            '<tr><th>ID</th><th>Nombre</th><th>Marca</th><th>Tipo</th><th>Sabor</th><th>Tamaño</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>';

        arrSodas.forEach(function (item) {
            htmlTableUsers += '<tr>' +
                '<td>' + item.id + '</td>' +
                '<td>' + item.nombre + '</td>' +
                '<td>' + item.marca + '</td>' +
                '<td>' + item.tipo + '</td>' +
                '<td>' + item.sabor + '</td>' +
                '<td>' + item.tamano + '</td>' +
                '<td>' + item.precio + '</td>' +
                '<td>' + item.stock + '</td>' +
                '<td>' +
                '<button onclick="editarRefresco(' + item.id + ')">Editar</button> ' +
                '<button onclick="deleteRefresco(' + item.id + ')">Eliminar</button>' +
                '</td>'
            '</tr>';
        });

        htmlTableUsers += '</table>';

        $('#resultado').html(htmlTableUsers);
    });
}

function deleteRefresco(id) {
    if (!confirm("¿Estás seguro de eliminar el refresco " + id + "?")) return;

    $.ajax({
        url: url + '/' + id,
        type: 'DELETE',
        success: function (data) {
            alert('Refresco eliminado con éxito: ' + JSON.stringify(data));
            getRefrescos();
        },
        error: function (err) {
            alert('Error al eliminar refresco');
            console.error(err);
        }
    })
}