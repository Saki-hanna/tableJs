(function($)
{
    $.fn.tableJs=function(options)
    {
        var defaults =
            {
                // attributs
                linesTitle:[{
                    title:'colone 1',
                    name:'columOne'
                }],
                data:[],
                // methodes
                'createTable' : function(thisPlugin)
                {
                    // construction du tableau
                    var table ="<table ";
                    if(params.idName) table+= " id='" + params.idName + "'";
                    if(params.className) table+= " class='" + params.className + "'";
                    table+= ">";
                    $.each(params.linesTitle, function(key, value){
                        table+= '<tr>';
                        table+= '<th>'+value.title+'</th>';
                        $.each(params.data, function(index, data){
                            table+= '<th>'+data[value.name]+'</th>';
                        });
                        table+= '</tr>';
                    });

                    table+= "</table>";
                    thisPlugin.html(table);
                }


            };// END defaults

        // Fusion defaults & options
        var params = $.extend(defaults, options);
        // On applique a tous les objets concernés
        return this.each(function()
        {
            // si aucun tableau existe, creation du tableau

            if(! $(this).chidren)
            {
                params.createTable($(this));
            }else
            {

                //sinon modification du tableau
                //je cherche le table
                var table = $(this);

                // appel des setters
                //if(appel des attributs)	appel des setter
                if(params.css)				params.setCss(table);
                if(params.cssFirstLine) 	params.setCssFirstLine(table);
                if(params.cssFirstColumn) 	params.setCssFirstColumn(table);
                //si un tableau existe
                if(params.cssLastColumn) 	params.setCssLastColumn(table);
                if(params.cssLastLine) 		params.setCssLastLine(table);
                if(params.titles)			params.addtitle(table);
                if(params.textCell)			params.addTextCell(table);
                // callback
                if(params.callback) 		params.callback();
            }
        });
    };
})(jQuery);