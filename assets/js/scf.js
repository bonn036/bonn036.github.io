"use strict";
const SCF_BASE_URL = "https://service-ldov3q1z-1253337859.ap-beijing.apigateway.myqcloud.com/release/"

function scf(path, method, data, success) {
    var url = SCF_BASE_URL + path;
    var dateTime = new Date().toGMTString();
    var SecretId = 'AKID4hyTNr3RpbR42q5qmulvs8EC4zj61n9e0apc';
    var SecretKey = 'B9yiBymEPn2c4503k4M0b5wuk837lPkyJ07jku9E';
    var source = 'web';
    var auth = "hmac id=\"" + SecretId + "\", algorithm=\"hmac-sha1\", headers=\"x-date source\", signature=\"";
    var signStr = "x-date: " + dateTime + "\n" + "source: " + source;
    var sign = auth + CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(signStr, SecretKey)) + "\"";
    $.ajax({
        url: url,
        type: method,
        data: JSON.stringify(data),
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("X-Date", dateTime);
            XMLHttpRequest.setRequestHeader("Source", source);
            XMLHttpRequest.setRequestHeader("Authorization", sign);
        },
        success: success,
        error: function (err) {
        },
        complete: function (XMLHttpRequest, status) {
        },
        dataType: 'json'
    });

};