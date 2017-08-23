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
            language: {
                processing: "Traitement en cours...",
                search: "Rechercher&nbsp;:",
                lengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
                info: "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
                infoEmpty: "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
                infoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
                infoPostFix: "",
                loadingRecords: "Chargement en cours...",
                zeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
                emptyTable: "Aucune donnée disponible dans le tableau",
                paginate: {
                    first: "Premier",
                    previous: "Pr&eacute;c&eacute;dent",
                    next: "Suivant",
                    last: "Dernier"
                },
                aria: {
                    sortAscending: ": activer pour trier la colonne par ordre croissant",
                    sortDescending: ": activer pour trier la colonne par ordre décroissant"
                }
            },
            responsive: !0,
            autoWidth: !0,
            searching: !1,
            paging: !0,
            lengthMenu: [ [ 10, -1 ], [ 10, "Tout" ] ],
            pageLength: 10,
            lengthChange: !1,
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
        }), $('input[data-type="number"]').on("input", function(evt) {
            var self = $(this);
            self.val(self.val().replace(/[^0-9\.]/g, "")), 46 == evt.which && self.val().indexOf(".") == -1 || !(evt.which < 48 || evt.which > 57) || evt.preventDefault();
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