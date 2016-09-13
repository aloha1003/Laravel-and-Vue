(function($) {
    "use strict";
    $.fn.searchInTable = function(selector, opt) {
        var defaultOption = {
            'inputSelector': 'input', // Listen Input selector
            'compareTargetAttribute': 'value',    // Compare attribute
            'compareTargetSelector': 'input',    // Compare selector
            'inputSelectorTriggerEvent': 'keyup',
            'refreshSelector': 'refresh',
            'refreshSelectorTriggerEvent': 'click',
            'fieldAry': []
        };
        var currentSelector = selector;
        var option = $.extend(defaultOption, opt);

        var that = $(this);
        $('body').delegate(option.inputSelector, option.inputSelectorTriggerEvent, function() {
            search($(option.compareTargetSelector).attr(option.compareTargetAttribute), that, option.fieldAry);
        });
        $('body').delegate(option.refreshSelector, option.refreshSelectorTriggerEvent, function() {
            refresh(that);
        });

        function refresh(targetTable) {
            if (!$(targetTable).children('tbody')) {
                console.log("No Found " + targetTable);
                return false;
            }
            var tr = $(targetTable).children('tbody').children('tr');
            tr.show();
        }

        function search(key, targetTable, field = []) {
            
            if (!$(targetTable).children('tbody')) {
                console.log("No Found " + targetTable);
                return false;
            }
            var th = [];
            var thead =[];
            var skipFirstRow = false;
            if ($(targetTable).children('thead').length) {
                th = $(targetTable).children('thead').children('tr').children('th');
            } else {
                if ($($(targetTable).children('tbody').children('tr')[0]).children('th')) {
                    th = $($(targetTable).children('tbody').children('tr')[0]).children('th');
                } else {
                    th = $($(targetTable).children('tr')[0]).children('td');
                }
                skipFirstRow = true;
            }
            var tr = $(targetTable).children('tbody').children('tr');
            if (key == '') {
                tr.show();
                return true;
            }
            if (field.length < 0) {
                return false;
            }
            tr.hide();
            if (skipFirstRow) {
                $(tr[0]).show();
            }
            for (var j = 0; j < field.length; j++) {
                var searchIndex = -1;
                th.each(function(i) {
                    console.log($(this).attr('data-searchIndex') +'=='+ field[j]);
                    if ($(this).attr('data-searchIndex') == field[j]) {
                        searchIndex = i;
                        return true;
                    }
                });
                searchIndex += 1;
                if (searchIndex == 0) {
                    console.log("No Found Field :" + field[j]);
                }

                tr.children('td:nth-child(' + searchIndex + ')').each(function(index) {
                    if (compareStr(key, $(this).text()) != -1) {
                        $(this).parent('tr').show();
                    }
                });
            }

        }

        function compareStr(searchStr, source) {
            var Reg = new RegExp(searchStr, 'g');
            return source.search(Reg);
        }
        return $(currentSelector);

    };
}(jQuery));
