(function($) {
    var radios = {};

    var Check = function(el, options) {
        this.$el = $(el);
        this.$input = this.$el.children('input');

        this.$input.before('<span class="check-icon"></span>');
        this.$input.prop('type') == 'checkbox' ? this.$el.addClass('check-checkbox') : this.$el.addClass('check-radio');

        var inlineOptions = {
            checked: this.$input.attr('checked'),
            disabled: this.$input.attr('disabled')
        };

        $.extend(this, options, inlineOptions);

        this.init();
    };

    Check.prototype = {
        $el: null,
        $input: null,

        disabled: false,
        checked: false,

        constructor: Check,

        init: function() {
            this._applyAttributes();

            var self = this;
            this.$input.change(function() {
                self.setChecked(this.checked);
            });
        },

        _applyAttributes: function() {
            this.setChecked(this.checked);
            this.setDisabled(this.disabled);
        },

        setChecked: function(checked) {
            if(this.disabled)return;
            
            var name = this.$input.prop('name');
            var radio;
            if (this.$input.attr('type') === 'radio' && name) {
                radio = radios[name];
                if (checked && radio != this) {
                    radio && radio.setChecked(false);
                    radios[name] = this;
                } else if (!checked && radio == this) {
                    radios[name] = null;
                }
            }

            this.$input.prop('checked', checked);
            this.$el.toggleClass('checked', checked);
            this.checked = checked;
        },

        setDisabled: function(disabled) {
            this.$input.attr('disabled', disabled);
            this.$el.toggleClass('disabled', disabled);
            this.disabled = disabled;
        }
    };

    // jquery plugin wrapper
    $.fn.check = function(options, param) {
        if (typeof options === 'string') {
            return $.fn.check.methods[options](this, param);
        }

        options = options || {};
        return this.each(function() {
            var inst = $.data(this, 'check');
            if (!inst) {
                $.data(this, 'check', new Check(this, options));
            }
        });
    };

    $.fn.check.methods = {
        setChecked: function($jq, checked) {
            return $jq.each(function() {
                $.data(this, 'check').setChecked(checked);
            });
        },

        setDisabled: function($jq, disabled) {
            return $jq.each(function() {
                $.data(this, 'check').setDisabled(disabled);
            });
        },

        option: function($jq, prop) {
            var inst = $.data($jq[0], 'check');
            if (prop == 'value') {
                return inst.$input.val();
            }
            return inst[prop];
        }
    };
}(jQuery));