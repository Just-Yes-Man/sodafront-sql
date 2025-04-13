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
            limpiarInputs()
            $('#resultado').html(`
                <div class="mensaje-exito">✅ Refresco creado correctamente</div>
            `);
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

function getById() {
    const id = $('#id').val();
    $.getJSON(url + '/' + id, function (data) {
        const refresco = data.refresco;

        if (refresco) {
            var htmlTableUsers = '<table border="1">' +
                '<tr><th>ID</th><th>Nombre</th><th>Marca</th><th>Tipo</th><th>Sabor</th><th>Tamaño</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>';
            htmlTableUsers += '<tr>' +
                '<td>' + refresco.id + '</td>' +
                '<td>' + refresco.nombre + '</td>' +
                '<td>' + refresco.marca + '</td>' +
                '<td>' + refresco.tipo + '</td>' +
                '<td>' + refresco.sabor + '</td>' +
                '<td>' + refresco.tamano + '</td>' +
                '<td>' + refresco.precio + '</td>' +
                '<td>' + refresco.stock + '</td>' +
                '<td>' +
                '<button onclick="editarRefresco(' + refresco.id + ')">Editar</button> ' +
                '<button onclick="deleteRefresco(' + refresco.id + ')">Eliminar</button>' +
                '</td>'
            '</tr>';
            htmlTableUsers += '</table>';
            $('#resultado').html(htmlTableUsers);
        } else {
            alert('Refresco no encontrado.');
        }
    });
}


function updateRefresco() {
    const id = $('#btn-update').data('id');

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
            limpiarInputs()
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
                '<td data-label="ID">' + item.id + '</td>' +
                '<td data-label="Nombre">' + item.nombre + '</td>' +
                '<td data-label="Marca">' + item.marca + '</td>' +
                '<td data-label="Tipo">' + item.tipo + '</td>' +
                '<td data-label="Sabor">' + item.sabor + '</td>' +
                '<td data-label="Tamaño">' + item.tamano + '</td>' +
                '<td data-label="Precio">' + item.precio + '</td>' +
                '<td data-label="Stock">' + item.stock + '</td>' +
                '<td data-label="Acciones">' +
                '<button onclick="editarRefresco(' + item.id + ')">Editar</button> ' +
                '<button onclick="deleteRefresco(' + item.id + ')">Eliminar</button>' +
                '</td>' +
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

function limpiarInputs() {
    $('#nombre').val('');
    $('#marca').val('');
    $('#tipo').val('');
    $('#sabor').val('');
    $('#tamano').val('');
    $('#precio').val('');
    $('#stock').val('');
    $('#id').val('');
}