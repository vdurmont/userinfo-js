function showError(msg) {
  document.body.innerHTML = "<h2>Error!</h2><p>"+msg+"</p>";
};

function showData(data) {
  var html = "<h2>Results:</h2>";
  html += "<ul>";
  html += "<li><strong>Request date:</strong> "+data.request_date+"</li>";
  html += "<li><strong>IP Address:</strong> "+data.ip_address+"</li>";
  html += "<li><strong>Continent:</strong> "+data.continent.name +" ("+data.continent.code+")</li>";
  html += "<li><strong>Country:</strong> "+data.country.name +" ("+data.country.code+")</li>";
  html += "<li><strong>City:</strong> "+data.city.name +" ("+data.city.code+")</li>";
  html += "</ul>";
  document.body.innerHTML = html;
};
