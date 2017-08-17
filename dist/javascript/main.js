$(function() {
    bootstrapComponents.init(), formValidator.init(), passwordShowToggle.init();
});

var bootstrapComponents = function() {
    function _init() {
        $('[data-toggle="popover"]').popover(), $(".selectpicker").selectpicker(), $('[data-table="data-table"]').dataTable({
            responsive: !0,
            autoWidth: !0,
            searching: !1,
            paging: !1,
            ordering: !0,
            info: !1
        });
    }
    return {
        init: _init
    };
}(), formValidator = function() {
    function _init() {
        $('[data-toggle="validator"]').validator({
            feedback: {
                success: "is-check",
                error: "is-close"
            },
            focus: !1,
            disable: !1
        });
    }
    return {
        init: _init
    };
}(), passwordShowToggle = function() {
    function _init() {
        var btnToggle = $(".show-hide-password"), pwInput = $("#user-password_id");
        $(btnToggle).bind("click", function(e) {
            e.preventDefault(), $(this).toggleClass("visible"), console.log(0), $(this).hasClass("visible") ? (pwInput.attr("type", "text"), 
            console.log(1)) : (pwInput.attr("type", "password"), console.log(2));
        });
    }
    return {
        init: _init
    };
}();