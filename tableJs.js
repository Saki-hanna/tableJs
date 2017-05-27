(function ($) {
    $.fn.tableJs = function (options) {
        var defaults =
            {
                // attributs
                linesTitle: [{
                    title: 'colone 1',
                    name: 'columOne'
                }],
                data: [],
                method: '',
                // methodes
                createTable: function (that) {
                    // construction du tableau
                    var $table = $('<table/>');
                    $table.append('<thead/>');
                    $table.append('<tbody/>');
                    $table.append('<tfoot/>');

                    params.idName && $table.prop('id', params.idName);
                    params.className && $table.addClass(params.className);
                    params._addLines($table, true);

                    that.append($table);
                },
                addLines: function ($table) {
                    params._addLines($table, false);
                },
                newData: function ($table) {
                    $.each($table.find('tr'), function (i, tr) {
                        $tr = $(tr);
                        $td = ($tr.parent().is('thead') && i === 0) ? $('<th/>') : $('<td/>');
                        $td.attr({
                            'data-long': $tr.children().data('title'),
                            'data-lat': params.data.id
                        });
                        $.each(params.data, function (lineTitle, data) {
                            if ($tr.children().data('title') === lineTitle) {
                                $td.text(data.dataText);
                                (data.dataAttr) && $td.attr(data.dataAttr);
                            }

                        });
                        $tr.append($td);
                    });
                },
                editData: function ($table, allparams) {
                    var lat = allparams.id;
                    $.each(params.data, function (long, data) {
                        $.each($table.find('td'), function (i, td) {
                            $td = $(td);

                            if ($td.data('long') === long && $td.data('lat') === lat) {
                                $td.text(data.dataText);
                                (data.dataAttr) && $td.attr(data.dataAttr);
                            }
                        });
                    });
                },
                _addLines: function ($table, create) {
                    $.each(params.linesTitle, function (key, value) {
                        var $tr = $('<tr/>');
                        $tr.append(
                            $('<th/>', {
                                    text: value.title,
                                    'data-title': value.name
                                }
                            )
                        );

                        $.each(params.data, function (index, data) {
                            textValue = (data[value.name])? data[value.name].dataText : '';
                            element = (create && key === 0 && params.hasHeader)?'<th/>':'<td/>';

                            cell = $(element, {
                                text: textValue,
                                'data-long': value.name,
                                'data-lat': data.id
                            });

                            (data[value.name] && data[value.name].dataAttr) && cell.attr(data[value.name].dataAttr);


                            $tr.append(cell)
                        });

                        if (create) {
                            tElement = (key === 0 && params.hasHeader)? 'thead' : 'tbody';
                            $table.find(tElement).append($tr);
                        } else {
                            $table.append($tr);
                        }

                    });
                }


            };// END defaults

        // Fusion defaults & options
        var params = $.extend(defaults, options);
        // On applique a tous les objets concernés
        return this.each(function () {
            // si l'enfant est de type table alors le tableau est déjà creer, sinon on le créer
            if ($(this).children().is('table')) {
                if (params.method) {
                    (params.method.name === 'addLines') && params.addLines($(this).children());
                    (params.method.name === 'editData' && params.method.params) && params.editData($(this).children(), params.method.params);
                    (params.method.name === 'newData') && params.newData($(this).children());
                }


            } else {
                params.createTable($(this));

            }
        });
    };
})(jQuery);