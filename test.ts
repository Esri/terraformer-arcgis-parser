import ArcGIS = require("./terraformer-arcgis-parser");

console.assert(typeof ArcGIS !== undefined);

// parse an ArcGIS Geometry to GeoJSON
let geojsonPoint = ArcGIS.parse({
  "x": -122.6764,
  "y": 45.5165,
  "spatialReference": {
    "wkid": 4326
  }
});

// convert a GeoJSON object into an ArcGIS geometry
let arcgisPoint = ArcGIS.convert(geojsonPoint);