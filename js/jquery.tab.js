(function($) {
    var Tab = function(el, options) {
        this.el = el;
        this.$el = $(el);
        this._mTabs = {};
        this._mPanels = {};

        $.extend(this, options);

        this.init();
    };

    Tab.prototype = {
        constructor: Tab,

        attribute: 'href',
        trigger: 'click',
        active: 1,
        activeClass: 'active',

        preventEvent: true,

        el: null,
        $el: null,

        _selected: null,
        _mTabs: null,
        _mPanels: null,

        init: function() {
            var attr = this.attribute;
            var mTabs = this._mTabs;
            var mPanels = this._mPanels;
            var trigger = (this.trigger == 'click') ? 'click' : 'mouseenter';
            var selector = '[' + attr + ']';

            this.$el.find(selector).each(function() {
                var id = this.getAttribute(attr).substring(1);
                var panel = document.getElementById(id);
                mTabs[id] = this;
                mPanels[id] = panel;
                if (panel) {
                    panel.style.display = 'none';
                }
            }).end().on(trigger, selector, $.proxy(this, '_onTriggerd'));

            this.select(this.active);
        },

        _onTriggerd: function(e) {
            this.preventEvent && e.preventDefault();
            this.select(e.currentTarget);
        },

        getSelectedId: function() {
            return this._selected;
        },

        select: function(id) {
            var type = typeof id;

            if (type === 'number') {
                id = this.$el.find('[' + this.attribute + ']').eq(id - 1).attr(this.attribute).substring(1);
            } else if (type === 'object') {
                id = $(id).attr(this.attribute).substring(1);
            }

            if (id == this._selected || !id) return;

            var $oldTab = $(this._mTabs[this._selected]);
            var $oldPanel = $(this._mPanels[this._selected]);
            var $newTab = $(this._mTabs[id]);
            var $newPanel = $(this._mPanels[id]);
            
            var hideEvent = $.Event('hide.tab');
            $oldPanel.triggerHandler(hideEvent);
            if(hideEvent.isDefaultPrevented()){
                return;
            }
            $newPanel.triggerHandler('show.tab');

            this._selected = null;
            $oldTab.removeClass(this.activeClass);
            $oldPanel.hide();

            $oldPanel.triggerHandler('hidden.tab');

            this._selected = id;
            $newTab.addClass(this.activeClass);
            $newPanel.show();

            $newPanel.triggerHandler('shown.tab');
        }
    };

    $.fn.tab = function(options, param) {
        if (typeof options === 'string') {
            return $.fn.tab.methods[options](this, param);
        }

        options = options || {};
        return this.each(function() {
            var inst = $.data(this, 'tab');
            if (!inst) {
                $.data(this, 'tab', new Tab(this, options));
            }
        });
    };

    $.fn.tab.methods = {
        select: function($jq, id) {
            return $jq.each(function() {
                $.data(this, 'tab').select(id);
            });
        },

        getSelectedId: function($jq) {
            return $.data($jq[0], 'tab').getSelectedId();
        }
    };
}(jQuery));