UserInfo.js
============

This library helps you query the [userinfo.io](http://userinfo.io) API and retrieve useful information about your user such as his IP address and his location.

## Installation

Just add the library to your html file:

```html
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/userinfo/1.1.1/userinfo.min.js"></script>
```

This will load the library from CDNJS. You can also download the [version 1.1.1](https://github.com/vdurmont/userinfo-js/releases/tag/v1.1.1) or use the [current development version](https://github.com/vdurmont/userinfo-js/blob/master/dist/userinfo.min.js) (may not be stable).

Note: this library is an AMD module so you can also use it with requirejs, curl, lsjs, etc.

## Usage

### Call the API

```javascript
UserInfo.getInfo(function(data) {
  // Do something with the data
}, function(err) {
  // Do something with the error
});
```

### The `data` object

Here is an example of what is returned by the API:

```json
{
  "request_date": "2014-09-21T01:20:46.861Z",
  "ip_address": "192.77.237.95",
  "position": {
    "latitude": 37.7758,
    "longitude": -122.4128,
    "accuracy": null
  },
  "continent": {
    "name": "North America",
    "code": "NA"
  },
  "country": {
    "name": "United States",
    "code": "US"
  },
  "city": {
    "name": "San Francisco",
    "code": "94103"
  }
}
```

Note that you will have to check the existence of the fields: if it can't resolve your position, userinfo will return `null` values.

## Changelog

* **v1.1.1**
    * Fix IE8 & IE9 issues with cross-domain requests
* **v1.1.0**
    * The API url is now in https
    * Sending a `X-Userinfo-Client-Id` header with the requests to identify the client
* **v1.0.0**
    * Initial release
