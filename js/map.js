(function() {
  // Función para cargar scripts dinámicamente con callback para compatibilidad
  function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState) {  // IE <= 8
      script.onreadystatechange = function() {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {  // Otros navegadores
      script.onload = callback;
    }

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  // Función para cargar estilos CSS dinámicamente
  function loadCSS(url) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  // Esperar a que DOM esté listo (compatibilidad)
  function ready(fn) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(fn, 1);
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {  // IE <= 8
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'complete') {
          fn();
        }
      });
    }
  }

  function initMap() {
    var mapaCentro = [19.674956, -99.802572]; // Coordenadas CDMX
    var zoom = 15;

    var map = L.map("mapa").setView(mapaCentro, zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    // Marcador con popup
    L.marker(mapaCentro)
      .addTo(map)
      .bindPopup("<b>Biometric Solutions</b><br>Jocotitlán")
      .openPopup();
  }

  ready(function() {
    loadCSS("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
    loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", initMap);
  });
})();
