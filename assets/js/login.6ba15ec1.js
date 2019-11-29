"use strict";
$(document).ready(function () {

    // ------------------------------------------------------- //
    // Universal Form Validation
    // ------------------------------------------------------ //

    $('.form-validate').each(function () {
        $(this).validate({
            errorElement: "div",
            errorClass: 'is-invalid',
            validClass: 'is-valid',
            ignore: ':hidden:not(.summernote),.note-editable.card-block',
            errorPlacement: function (error, element) {
                // Add the `invalid-feedback` class to the error element
                error.addClass("invalid-feedback");
                //console.log(element);
                if (element.prop("type") === "checkbox") {
                    error.insertAfter(element.siblings("label"));
                }
                else {
                    error.insertAfter(element);
                }
            }
        });
    });

    // ------------------------------------------------------- //
    // Material Inputs
    // ------------------------------------------------------ //

    var materialInputs = $('input.input-material');

    // activate labels for prefilled values
    materialInputs.filter(function () {
        return $(this).val() !== "";
    }).siblings('.label-material').addClass('active');

    // move label on focus
    materialInputs.on('focus', function () {
        $(this).siblings('.label-material').addClass('active');
    });

    // remove/keep label on blur
    materialInputs.on('blur', function () {
        $(this).siblings('.label-material').removeClass('active');

        if ($(this).val() !== '') {
            $(this).siblings('.label-material').addClass('active');
        } else {
            $(this).siblings('.label-material').removeClass('active');
        }
    });

    // login
    $('#login').click(function () {
        var body = {
            "username":$.trim($('#login-username').val()),
            "password":$.trim($('#login-password').val())
        };
        // var dat = new Object();
        // dat.username = $.trim($('#login-username').val());
        // dat.password = $.trim($('#login-password').val());
        var success = function (data, status, xhr) {
            if (status === 'success') {
                try {
                    if (data["status"] == 200) {
                        sessionStorage.setItem("aud", xhr.getResponseHeader("Audience"))
                        sessionStorage.setItem("auth", xhr.getResponseHeader("Authorization"))
                        location.href = "dashboard.html";
                    }
                } catch (e) {
                    console.log(e);
                }
            } else {
                console.log("status false");
            }
        };
        try {
            fc("/login", 'POST', body, success);
        } catch (e) {
            console.log(e)
        }
        return false;
    });
});