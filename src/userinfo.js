(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.UserInfo = factory();
    }
}(this, function() {
    var API_URL = "//api.userinfo.io/userinfos";

    // Returns IE version or false for other browsers
    // https://gist.github.com/padolsey/527683
    var ie = (function() {
        var v = 3,
            div = document.createElement('div'),
            a = div.all || [];

        while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><br><![endif]-->', a[0]);

        return v > 4 ? v : !v;
    }());

    return {
        getInfo: function(success, failure) {

            var needXDR = ie === 8 || ie === 9;

            // IE 8 & 9 require the use of XDomainRequest for cross-domains calls
            if (needXDR && window.XDomainRequest) {
                var xdr = new XDomainRequest();
                xdr.onerror = function() {
                    if (failure) {
                        failure({
                            message: "Error with HTTP status code: " + xdr.status
                        });
                    }
                };
                xdr.onload = function() {
                    if (success) {
                        success(JSON.parse(xdr.responseText));
                    }
                };

                xdr.open("GET", API_URL, true);
                xdr.send();
            } else {
                var xhr;
                if (window.XMLHttpRequest) {
                    // code for IE7+, Firefox, Chrome, Opera, Safari
                    xhr = new XMLHttpRequest();
                } else {
                    // code for IE6, IE5
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }

                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            if (success) {
                                success(JSON.parse(xhr.responseText));
                            }
                        } else {
                            var err;
                            if (xhr.responseText !== null && xhr.responseText !== "") {
                                err = JSON.parse(xhr.responseText);
                            } else {
                                err = {
                                    message: "Error with HTTP status code: " + xhr.status
                                };
                            }
                            if (failure) {
                                failure(err);
                            }
                        }
                    }
                };

                xhr.open("GET", API_URL, true);
                xhr.setRequestHeader("X-Userinfo-Client-Id", "userinfo-js:1.1.1");
                xhr.send();
            }
        }
    };
}));
