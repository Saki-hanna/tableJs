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
                'createTable': function (that) {
                    // construction du tableau
                    var $table = $('<table/>');
                    $table.append('<tbody/>');

                    params.idName && $table.prop('id', params.idName);
                    params.className && $table.addClass(params.className);
                    $.each(params.linesTitle, function (key, value) {
                        var $tr = $('<tr/>');
                        $tr.append(
                            $('<th/>', {text: value.title}
                            )
                        );

                        $.each(params.data, function (index, data) {
                            $tr.append(
                                $('<td/>', {text: data[value.name]})
                            )
                        });

                        $table.find('tbody').append($tr);

                    });
                    that.append($table);
                },
                addLines: function ($table) {
                    $.each(params.linesTitle, function (key, value) {
                        var $tr = $('<tr/>');
                        $tr.append(
                            $('<th/>', {text: value.title}
                            )
                        );

                        $.each(params.data, function (index, data) {
                            $tr.append(
                                $('<td/>', {text: data[value.name]})
                            )
                        });

                        $table.append($tr);

                    });
                }


            };// END defaults

        // Fusion defaults & options
        var params = $.extend(defaults, options);
        // On applique a tous les objets concernés
        return this.each(function () {
            // si l'enfant est de type table alors le tableau est déjà creer, sinon on le créer
            if ($(this).children().is('table')) {
                console.log('edit');
                if (params.method === 'addLines') params.addLines($(this).children());

            } else {
                console.log('create');
                params.createTable($(this));

            }
        });
    };
})(jQuery);