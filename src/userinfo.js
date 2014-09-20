var UserInfo = (function() {
  var API_URL = "http://userinfo.io/userinfos";

  return {
    getInfo: function(callback) {
      var xhr;

      if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
      } else {
        // code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 ) {
          if(xhr.status == 200){
            callback(JSON.parse(xhr.responseText), null);
          } else {
            var err;
            if (xhr.responseText !== null && xhr.responseText !== "") {
              err = JSON.parse(xhr.responseText);
            } else {
              err = { message: "Error with HTTP status code: " + xhr.status };
            }
            callback(null, err);
          }
        }
      };

      xhr.open("GET", API_URL, true);
      xhr.send();
    }
  };
})();
