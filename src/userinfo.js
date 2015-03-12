(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.UserInfo = factory();
    }
}(this, function() {
    var API_URL = "http://api.userinfo.io/userinfos";

    return {
        getInfo: function(success, failure) {
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
                            err = { message: "Error with HTTP status code: " + xhr.status };
                        }
                        if (failure) {
                            failure(err);
                        }
                    }
                }
            };

            xhr.open("GET", API_URL, true);
            xhr.setRequestHeader("X-Userinfo-Client-Id", "userinfo-js:1.0.0");
            xhr.send();
        }
    };
}));
