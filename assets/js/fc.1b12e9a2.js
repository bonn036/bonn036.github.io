
"use strict";
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

const FC_BASE_URL = "https://1957987999843283.cn-beijing.fc.aliyuncs.com/2016-08-15/proxy/abhouse_main/index"
const TEST_URL = "http://localhost:8000/2016-08-15/proxy/abhouse_main/index"
const TEST2_URL = "http://127.0.0.1:9000"
function fc(path, method, data, onSuccess, onError, onComplete) {
    var body = "None";
    if (method == 'POST') {
        body = JSON.stringify(data);
    }

    var appKey = "203758497"
    var timeStamp = new Date().getTime() + "";
    var nonce = guid();
    // var contentType = "CONTENT_TYPE_TEXT";
    var contentType = "application/json";
    var contentMD5 = CryptoJS.enc.Base64.stringify(CryptoJS.MD5(CryptoJS.enc.Utf8.parse(body)));
    var stage = "RELEASE";
    var audience = getCookie("aud");
    audience = audience == null ? "" : audience
    var authorization = getCookie("auth");
    authorization = authorization == null ? "" : authorization
    var sigHeaders = "X-Ca-Key,X-Ca-Nonce,X-Ca-Stage,Audience,Authorization";
    var headers = 
        "X-Ca-Key:" + appKey + "\n" +
        "X-Ca-Nonce:" + nonce + "\n" +
        "X-Ca-Stage:" + stage + "\n" +
        "Audience:" + audience + "\n" +
        "Authorization:" + authorization + "\n";
    var url = FC_BASE_URL + path;
    var stringToSign = method.toLowerCase() + "\n" +
        contentMD5.toLowerCase() + "\n" +
        contentType.toLowerCase() + "\n" +
        timeStamp.toLowerCase() + "\n" +
        headers +
        url.toLowerCase();
    var sig = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(CryptoJS.HmacSHA256(
            CryptoJS.enc.Utf8.parse(stringToSign),
            CryptoJS.enc.Utf8.parse(nonce))));

    $.ajax({
        url: url,
        type: method,
        contentType: "application/json",
        data: body,
        // crossDomain: true,
        // xhrFields: {
        //     withCredentials: true
        // },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-Ca-Key", appKey);
            xhr.setRequestHeader("X-Ca-Siguature", sig);
            xhr.setRequestHeader("X-Ca-Signature-Headers", sigHeaders);
            xhr.setRequestHeader("X-Timestamp", timeStamp);
            xhr.setRequestHeader("X-Ca-Nonce", nonce);
            xhr.setRequestHeader("Content-Type", contentType);
            xhr.setRequestHeader("Content-MD5", contentMD5);
            xhr.setRequestHeader("X-Ca-Stage", stage);
            xhr.setRequestHeader("Audience", audience);
            xhr.setRequestHeader("Authorization", authorization);
        },
        dataType: 'json',
        timeout: 5000,
        success: onSuccess,
        // success: function (data, status, xhr) {
        //     console.log("onSuccess: " + status);
        // },
        error: onError,
        // error: function (xhr, status, e) {
        //     location.href = "index.html";
        // },
        complete: onComplete,
        // complete: function (xhr, status) {
        //     console.log("oncomplete: " + status);
        // },
        // async: async,
    });
}

const API_BASE_URL = "https://4715447a45aa435a9344560779842e14-cn-beijing.alicloudapi.com"
function aliApi(path, method, data, success) {
    var appKey = "YOUR APPKEY";
    var appSecret = "YOUR APPCODE";
    var md5 = calcMd5();
    var dateObject = Date;
    var date = dateObject.toLocaleString();
    var nonce = createUuid();
    var textToSign = "";
    var accept = "*/*";
    var contentType = "";
    console.log("request" + JSON.stringify(request));
    if (request.headers["accept"]) {
        accept = request.headers["accept"];
    }
    if (request.headers["content-type"]) {
        contentType = request.headers["content-type"];
    }
    textToSign += request.method + "\n";
    textToSign += accept + "\n";
    textToSign += md5 + "\n";
    textToSign += contentType + "\n";
    textToSign += date + "\n";
    var headers = headersToSign();
    var signatureHeaders;
    var sortedKeys = Array.from(headers.keys()).sort()
    for (var headerName of sortedKeys) {
        textToSign += headerName + ":" + headers.get(headerName) + "\n";
        signatureHeaders = signatureHeaders ? signatureHeaders + "," + headerName : headerName;
    }
    textToSign += urlToSign();
    console.log("textToSign\n" + textToSign.replace(/\n/g, "#"));
    var hash = CryptoJS.HmacSHA256(textToSign, appSecret)
    console.log("hash:" + hash)
    var signature = hash.toString(CryptoJS.enc.Base64)
    console.log("signature:" + signature)
    pm.globals.set('AppKey', appKey);
    pm.globals.set('Md5', md5);
    pm.globals.set("Date", date);
    pm.globals.set("Signature", signature);
    pm.globals.set("SignatureHeaders", signatureHeaders);
    pm.globals.set("Nonce", nonce);
}

function headersToSign() {
    var headers = new Map();
    for (var name in request.headers) {
        name = name.toLowerCase();
        if (!name.startsWith('x-ca-')) {
            continue;
        }
        if (name === "x-ca-signature" || name === "x-ca-signature-headers" || name == "x-ca-key" || name === 'x-ca-nonce') {
            continue;
        }
        var value = request.headers[name];
        headers.set(name, value);
    }
    headers.set('x-ca-key', appKey);
    headers.set('x-ca-nonce', nonce);
    return headers;
}

function urlToSign() {
    var params = new Map();
    var contentType = request.headers["content-type"];
    if (contentType && contentType.startsWith('application/x-www-form-urlencoded')) {
        for (x in request.data) {
            params.set(x, request.data[x]);
        }
    }
    var queryParam = pm.request.url.query.members;
    console.log("request.url" + JSON.stringify(pm.request.url))
    for (let i in queryParam) {
        params.set(queryParam[i].key, queryParam[i].value);
    }
    var sortedKeys = Array.from(params.keys())
    sortedKeys.sort();
    var url = "";
    for (var k of pm.request.url.path) {
        url = url + "/" + k;
    }
    var qs;
    for (var k of sortedKeys) {
        var s = k + "=" + params.get(k);
        qs = qs ? qs + "&" + s : s;
        console.log("key=" + k + " value=" + params.get(k));
    }
    return qs ? url + "?" + qs : url;
}

function calcMd5() {
    var contentType = String(request.headers["content-type"]);
    console.log("data" + JSON.stringify(request.data));
    if (!JSON.stringify(request.data).startsWith('{}') && !contentType.startsWith('application/x-www-form-urlencoded')) {
        var data = request.data;
        var md5 = CryptoJS.MD5(data);
        var md5String = md5.toString(CryptoJS.enc.Base64);
        console.log("data:" + data + "\nmd5:" + md5String);
        return md5String;
    } else {
        return "";
    }
}

function createUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function setCookie(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}