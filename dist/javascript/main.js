$(function() {
    responsiveBlock.init(), bootstrapComponents.init(), formValidator.init(), passwordShowToggle.init();
});

var responsiveBlock = function() {
    function _init() {
        function viewMobile() {
            $("body").width() < screenTabletteMax ? $("#navbar-lang_id").insertBefore(".navbar-brand") : $("#navbar-lang_id").appendTo(".navbar-nav > li:nth-child(3)");
        }
        var screenTabletteMax = 992;
        viewMobile(), $(window).resize(function() {
            viewMobile();
        });
    }
    return {
        init: _init
    };
}(), bootstrapComponents = function() {
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
        function validationInput(inputFiled, validField) {
            $(inputFiled).on("keyup", function() {
                "" !== $(this).val() ? $(validField).prop("checked", !0) : $(validField).prop("checked", !1);
            });
        }
        $('[data-toggle="validator"]').validator({
            feedback: {
                success: "is-check",
                error: "is-close"
            },
            focus: !1,
            disable: !1
        });
        var inputEmail = $("#user-email_id"), inputEmailValid = $("#user-autorisations-email-0_id"), inputMobile = $("#user-tel-mobile_id"), inputMobileValid = $("#user-autorisations-mobile-0_id");
        validationInput(inputEmail, inputEmailValid), validationInput(inputMobile, inputMobileValid);
    }
    return {
        init: _init
    };
}(), passwordShowToggle = function() {
    function _init() {
        var btnToggle = $(".show-hide-password"), pwInput = $("#user-password_id");
        $(btnToggle).bind("click", function(e) {
            e.preventDefault(), $(this).toggleClass("visible"), $(this).hasClass("visible") ? pwInput.attr("type", "text") : pwInput.attr("type", "password");
        });
    }
    return {
        init: _init
    };
}();