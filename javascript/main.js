/** ==========================================
 * JS DOCUMENT
 *
 * PROJECT NAME:
 * DATE: 30/12/2016
 * AUTHOR: Issam-MZOUGHI
 ============================================ */
/* ========================================== *\
 *  INIT
 \* ========================================== */
$(function () {
    bootstrapComponents.init();
    formValidator.init();
    passwordShowToggle.init();
});
/* ========================================== *\
 *  MODULES
 \* ========================================== */

/* =bootstrapComponents */
var bootstrapComponents = function () {
    function _init() {
        $('[data-toggle="popover"]').popover();
        
        $('.selectpicker').selectpicker();

        $('[data-table="data-table"]').dataTable({
            responsive: true,
            autoWidth: true,
            searching: false,
            paging:   false,
            ordering: true,
            info:     false
        });

        // $('[data-target="#modal-saisie-ticket"]').on('click',function (e) {
        //     e.preventDefault();
        //     $('#modal-saisie-ticket').modal('show');
        // });

    }

    return {
        init: _init
    };
}();

/* =formValidator */
var formValidator = function () {
    function _init() {
        $('[data-toggle="validator"]').validator({
            feedback: {
                success: 'is-check',
                error: 'is-close'
            },
            focus: false,
            disable: false
        });
    }

    return {
        init: _init
    };
}();

/* =bootstrapComponents */
var passwordShowToggle = function () {
    function _init() {
        var btnToggle = $('.show-hide-password');
        var pwInput = $('#user-password_id');

        $(btnToggle).bind('click', function (e) {
            e.preventDefault();

            $(this).toggleClass('visible');

            console.log(0);

            if ($(this).hasClass('visible')) {
                pwInput.attr('type', 'text');
                console.log(1);
            } else {
                pwInput.attr('type', 'password');
                console.log(2);
            }

        });
    }

    return {
        init: _init
    };
}();