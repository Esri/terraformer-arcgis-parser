# Important!

This repo is part of the Terraformer project which has been archived. See https://github.com/Esri/terraformer#important for more details.

# Terraformer ArcGIS JSON Parser

[![Build Status](https://travis-ci.org/Esri/terraformer-arcgis-parser.svg?branch=master)](https://travis-ci.org/Esri/terraformer-arcgis-parser)

> Two way conversion between [GeoJSON](http://geojson.org/geojson-spec.html) and [ArcGIS Geometry](http://help.arcgis.com/en/arcgisserver/10.0/apis/rest/geometry.html).

## Installing

### Node.js

    $ npm install terraformer-arcgis-parser

### Browser

In the browser, [Terraformer](http://github.com/esri/terraformer) is required.

## Documentation

For full documentation check https://github.com/Esri/terraformer/blob/master/docs/arcgis-parser.md.

### Node.js
```js
var ArcGIS = require('terraformer-arcgis-parser');

// parse ArcGIS JSON, convert it to a Terraformer.Primitive (GeoJSON)
var primitive = ArcGIS.parse({
    'x':-122.6764,
    'y':45.5165,
    'spatialReference': {
      'wkid': 4326
    }
  });

// take a Terraformer.Primitive or GeoJSON and convert it back to ArcGIS JSON
var point = ArcGIS.convert({
  'type': "Point",
  'coordinates': [45.5165, -122.6764]
});
```
### Browser
```html
  <!-- Load the main Terraformer library -->
  <script src="https://unpkg.com/terraformer/terraformer.js" type="text/javascript"></script>

  <!-- Load the ArcGIS Parser -->
  <script src="https://unpkg.com/terraformer-arcgis-parser/terraformer-arcgis-parser.js" type="text/javascript"></script>

  <!-- Use it! -->
  <script>
    var primitive = Terraformer.ArcGIS.parse({
      'x':-122.6764,
      'y':45.5165,
      'spatialReference': {
        'wkid': 4326
      }
    });

    // take a Terraformer.Primitive or GeoJSON and convert it to ArcGIS JSON
    var point = Terraformer.ArcGIS.convert({
      'type': "Point",
      'coordinates': [45.5165, -122.6764]
    });
  </script>
```
### TypeScript
```
import arcgis = require("terraformer-arcgis-parser");
```

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Licensing

Copyright &copy; 2013-2018 Esri

A copy of the license is available in the repository's [LICENSE](./LICENSE) file.
