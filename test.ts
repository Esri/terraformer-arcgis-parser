import * as TerraformerArcGIS from "./index";

console.assert(typeof TerraformerArcGIS !== undefined);

// parse an ArcGIS Geometry to GeoJSON
let geojsonPoint = TerraformerArcGIS.parse({
  x: -122.6764,
  y: 45.5165,
  spatialReference: {
    wkid: 4326
  }
});

// convert a GeoJSON object into an ArcGIS geometry
let arcgisPoint = TerraformerArcGIS.convert(geojsonPoint);
