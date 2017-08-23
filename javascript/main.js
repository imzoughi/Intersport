/** ==========================================
 * JS DOCUMENT
 *
 * PROJECT NAME: INTERSPORT
 * DATE: 11/08/2017
 * AUTHOR: Issam-MZOUGHI
 ============================================ */

/* ========================================== *\
 *  INIT
 \* ========================================== */
$(function () {
    responsiveBlock.init();
    bootstrapComponents.init();
    formValidator.init();
    passwordShowToggle.init();
});
/* ========================================== *\
 *  MODULES
 \* ========================================== */

/* =responsiveBlock */
var responsiveBlock = function () {
    function _init() {
        var screenMobileMax = 768;
        var screenTabletteMax = 992;

        function viewMobile() {
            if ($("body").width() < screenTabletteMax) {
                $('#navbar-lang_id').insertBefore('.navbar-brand');
            } else {
                $('#navbar-lang_id').appendTo('.navbar-nav > li:nth-child(3)');
            }
        }

        viewMobile();

        $(window).resize(function() {
            viewMobile();
        });

    }

    return {
        init: _init
    };
}();

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

        // Form validator init
        $('[data-toggle="validator"]').validator({
            feedback: {
                success: 'is-check',
                error: 'is-close'
            },
            focus: false,
            disable: false
        });


        // Autorisation Email et Mobile
        function validationInput(inputFiled, validField) {
            $(inputFiled).on('keyup',function () {
                if($(this).val() !== ''){
                    //console.log('pas vide');
                    $(validField).prop('checked',true);
                } else {
                    //console.log('vide');
                    $(validField).prop('checked',false);
                }
            });
        }

        var inputEmail = $('#user-email_id');
        var inputEmailValid = $('#user-autorisations-email-0_id');
        var inputMobile = $('#user-tel-mobile_id');
        var inputMobileValid = $('#user-autorisations-mobile-0_id');

        validationInput(inputEmail,inputEmailValid);
        validationInput(inputMobile,inputMobileValid);

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

            // console.log(0);

            if ($(this).hasClass('visible')) {
                pwInput.attr('type', 'text');
                // console.log(1);
            } else {
                pwInput.attr('type', 'password');
                // console.log(2);
            }

        });
    }

    return {
        init: _init
    };
}();