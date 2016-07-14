(function($) {
    var CheckGroup = function(el) {
        this.$el = $(el);
        this.init();
    };

    CheckGroup.prototype = {
        constructor: CheckGroup,

        checkedClass: 'checked',

        init: function() {
            var type = this.$el.find('input').click($.proxy(this, '_onInputChange')).prop('type');
            this.multiple = type == 'checkbox' ? true : false;
        },

        _onInputChange: function(evt) {
            this.multiple ? this._updateCheckboxLabel(evt) : this._updateRadioLabel(evt);
        },

        _updateCheckboxLabel: function(evt) {
            var $label = $(evt.currentTarget).parent();
            var checked = evt.currentTarget.checked;
            var checkedClass = this.checkedClass;

            if (checked) {
                if ($label.attr('data-all')!==undefined) {
                    this.set($label.siblings(), false);
                } else {
                    this.set($label.siblings('[data-all]'), false);
                }
                $label.addClass(checkedClass);
            } else {
                var $siblings = $label.siblings();
                if ($siblings.hasClass(checkedClass) == false) {
                    if ($label.attr('data-all')!==undefined) {
                        evt.preventDefault();
                        return;
                    } else {
                        this.set($siblings.filter('[data-all]').eq(0), true);
                    }
                }
                $label.removeClass(checkedClass);
            }
        },

        _updateRadioLabel: function(evt) {
            var $label = $(evt.currentTarget).parent();
            var checkedClass = this.checkedClass;
            $label.addClass(checkedClass).siblings().removeClass(checkedClass);
        },

        set: function($label, checked) {
            $label.toggleClass(this.checkedClass, checked);
            $label.find('input').prop('checked', checked);
        }
    };

    $.fn.checkgroup = function() {
        return this.each(function() {
            var inst = $.data(this, 'checkgroup');
            if (!inst) {
                $.data(this, 'checkgroup', new CheckGroup(this));
            }
        });
    };
}(jQuery));
