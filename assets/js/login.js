"use strict";
$(document).ready(function () {

    // ------------------------------------------------------- //
    // Universal Form Validation
    // ------------------------------------------------------ //

    $('.form-validate').each(function() {
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
    $('#login').click(function() {
        var url = "http://service-ldov3q1z-1253337859.ap-beijing.apigateway.myqcloud.com/release/login";
        var data = {
            "username": $.trim($('#login-username').val()),
            "password": $.trim($('#login-password').val())
        }
        var success = function (data, status) {
            if (status == 'success' && data["status"] == 200) {
                location.href = "dashboard.html";
            }
        }
        url += "?username=" + $.trim($('#login-username').val()) + 
        "&password=" + $.trim($('#login-password').val())
        console.log(url)
        // $.get(url, data, success, "json");
        $.get(url, success);
        return false;
    });
});