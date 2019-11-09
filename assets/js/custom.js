"use strict";
$(document).ready(function () {

	/*-----------------------------------/
	/*	TOP NAVIGATION AND LAYOUT
	/*----------------------------------*/

	$('.btn-toggle-fullwidth').on('click', function () {
		if (!$('body').hasClass('layout-fullwidth')) {
			$('body').addClass('layout-fullwidth');

		} else {
			$('body').removeClass('layout-fullwidth');
			$('body').removeClass('layout-default'); // also remove default behaviour if set
		}

		$(this).find('.lnr').toggleClass('lnr-arrow-left-circle lnr-arrow-right-circle');

		if ($(window).innerWidth() < 1025) {
			if (!$('body').hasClass('offcanvas-active')) {
				$('body').addClass('offcanvas-active');
			} else {
				$('body').removeClass('offcanvas-active');
			}
		}
	});

	$(window).on('load', function () {
		if ($(window).innerWidth() < 1025) {
			$('.btn-toggle-fullwidth').find('.icon-arrows')
				.removeClass('icon-arrows-move-left')
				.addClass('icon-arrows-move-right');
		}

		// adjust right sidebar top position
		$('.right-sidebar').css('top', $('.navbar').innerHeight());

		// if page has content-menu, set top padding of main-content
		if ($('.has-content-menu').length > 0) {
			$('.navbar + .main-content').css('padding-top', $('.navbar').innerHeight());
		}

		// for shorter main content
		if ($('.main').height() < $('#sidebar-nav').height()) {
			$('.main').css('min-height', $('#sidebar-nav').height());
		}
	});


	/*-----------------------------------/
	/*	SIDEBAR NAVIGATION
	/*----------------------------------*/

	$('.sidebar a[data-toggle="collapse"]').on('click', function () {
		if ($(this).hasClass('collapsed')) {
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
	});

	if ($('.sidebar-scroll').length > 0) {
		$('.sidebar-scroll').slimScroll({
			height: '95%',
			wheelStep: 2,
		});
	}

	// 	// Data Maps
	// 		var bubble_map = new Datamap({
	// 		  element: document.getElementById("bubbles"),
	// 		  geographyConfig: {
	// 		    popupOnHover: true,
	// 		    highlightOnHover: true,
	// 		    highlightFillColor: '#55a8fd',
	// 		    highlightBorderColor: 'rgba(85, 168, 253, 0.2)'
	// 		  },
	// 		  fills: {
	// 		    defaultFill: '#e6e8ec',
	// 		    n_america: '#55a8fd',
	// 		    s_america: '#5dcfc7',
	// 		    asia: '#fb598e',
	// 		    africa: '#aa6df3'
	// 		  }

	// 		});
	// 		bubble_map.bubbles([
	// 		  {
	// 		    name: 'Not a bomb, but centered on Brazil',
	// 		    radius: 4,
	// 		    centered: 'BRA',
	// 		    country: 'Brazil',
	// 		    yeild: 25,
	// 		    fillKey: 's_america',
	// 		    date: '1954-03-01',
	// 		    highlightFillColor: '#55a8fd',
	// 		  },
	// 		  {
	// 		    name: 'Not a bomb',
	// 		    radius: 5,
	// 		    yeild: 40,
	// 		    country: 'USA',
	// 		    centered: 'USA',
	// 		    date: '1986-06-05',
	// 		    significance: 'Centered on US',
	// 		    fillKey: 'n_america',
	// 		    highlightFillColor: '#55a8fd',
	// 		  },
	// 		  {
	// 		    name: 'Castle Bravo',
	// 		    radius: 10,
	// 		    yeild: 20,
	// 		    country: 'Africa',
	// 		    significance: 'First dry fusion fuel "staged" thermonuclear weapon; a serious nuclear fallout accident occurred',
	// 		    fillKey: 'africa',
	// 		    date: '1954-03-01',
	// 		    highlightFillColor: '#55a8fd',
	// 		    latitude: -26.195246,
	// 		    longitude:28.034088
	// 		  },
	// 		  {
	// 		    name: 'Tsar Bomba',
	// 		    radius: 5,
	// 		    yeild: 35,
	// 		    country: 'Bangladesh',
	// 		    fillKey: 'asia',
	// 		    significance: 'Largest thermonuclear weapon ever tested—scaled down from its initial 100 Mt design by 50%',
	// 		    date: '1961-10-31',
	// 		    highlightFillColor: '#55a8fd',
	// 		    latitude: 23.6850,
	// 		    longitude: 90.3563
	// 		  }
	// 		], {
	// 		  popupTemplate: function(geo, data) {
	// 		    // return '<div class="hoverinfo"><strong>Yield:</strong>' + data.yeild + '<br/>Exploded on ' + data.date + ' by the '  + data.country + '</div>'
	// 		    return   '<div class="hoverinfo">'+data.country +' '+'<strong>$</strong>' + data.yeild + 'K' + '</div>'
	// 		  }
	// 		});

	// 	//feather icon
	// 		feather.replace()

});

const SCF_BASE_URL = "https://service-ldov3q1z-1253337859.ap-beijing.apigateway.myqcloud.com/release/"
function tencentScf(path, method, data, success) {
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

const FC_BASE_URL = "https://1459473231569671.cn-beijing.fc.aliyuncs.com/2016-08-15/proxy/abhouse_main/index/"
function alifc(path, method, data, success) {
	var url = FC_BASE_URL + path;
	var dateTime = new Date().toGMTString();
	var appKey = "203758497"
	var source = 'web';
	var Nonce = "";
	var contentMD5 = "";
	var sig = "{}";
	$.ajax({
		url: url,
		type: method,
		success: success,
		contentType: "application/json",
		dataType: 'json',
		data: JSON.stringify(data),
		beforeSend: function (XMLHttpRequest) {
			XMLHttpRequest.setRequestHeader("X-Date", dateTime);
			XMLHttpRequest.setRequestHeader("X-Ca-Key", appKey);
			XMLHttpRequest.setRequestHeader("X-Ca-Nonce", Nonce);
			XMLHttpRequest.setRequestHeader("Content-MD5", contentMD5);
			XMLHttpRequest.setRequestHeader("X-Ca-Siguature", sig);
			XMLHttpRequest.setRequestHeader("X-Ca-SignatureMethod", "HmacSHA256");
			XMLHttpRequest.setRequestHeader("X-Ca-SignatureHeaders", "X-Ca-Key,X-Ca-Nonce");
		},
		error: function (err) {
		},
		complete: function (XMLHttpRequest, status) {
		},
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