# Terraformer ArcGIS JSON Parser

This plugin handles 2 way conversion between [GeoJSON](http://geojson.org/geojson-spec.html) and the [ArcGIS Geometry](http://help.arcgis.com/en/arcgisserver/10.0/apis/rest/geometry.html) format used by Esri.

This package is part of the [Terraformer](https://github.com/Esri/Terraformer) project.

## Installing

### Node.js

    $ npm install terraformer-arcgis-parser

### Browser

In the browser, [Terraformer](http://github.com/esri/terraformer) is required.

You can use [Bower](http://bower.io/) to install the components if you like or download them and host them yourself.

```
$ bower install terraformer
$ bower install terraformer-arcgis-parser
```

## Usage

### Converting from the ArcGIS JSON format to GeoJSON
`Terraformer.ArcGIS.parse(json, options)` will parse ArcGIS JSON into a [Terraformer.Primitive](). 

#### Options
* `idAttribute` - When converting ArcGIS Feature objects like `geometry: { ... }, attributes: { ... }`, the ArcGIS JSON `attributes` will contain a key with the id of the feature. This is usually called `OBJECTID` or `FID` which is used by default ad the `id` attribute of the GeoJSON output. If your feature does not use the `OBJECTID` or `FID` keys as its id, you should define what field it uses for its id.

#### Notes
* If the object is in the Web Mercator spatial reference it will be converted to WGS84.
* This method is also aliased as `Terraformer.ArcGIS.fromGeoJSON`

### Converting from GeoJSON to the ArcGIS JSON format
`Terraformer.ArcGIS.convert(json, options)` - Converts a GeoJSON or a [Terraformer.Primitive]() into the ArdGIS JSON format.

#### Options
* `sr` - This is used to set the value of `spatialReference.wkid` on the output. By default this will use 4326.
* `idAttribute` - When converting GeoJSON Features the `id` key of your feature will be set on the `OBJECTID` field in your output. If you want to assign your id to a different key you should set this to the string of the key your wish to assign the `id` to.

#### Notes
* `FeatureCollection` and `GeometryCollection` objects are converted into arrays of ArcGIS Features or ArcGIS Geometries respectively.s

### Node.js
```js
var ArcGIS = require('terraformer-arcgis-parser');

// parse ArcGIS JSON, convert it to a Terraformer.Primitive
var primitive = ArcGIS.parse({
    x:"-122.6764",
    y:"45.5165",
    spatialReference: {
      wkid: 4326
    }
  });

// take a Terraformer.Primitive or GeoJSON and convert it to ArcGIS JSON
var point = ArcGIS.convert({
  "type": "Point",
  "coordinates": [45.5165, -122.6764]
});
```

### Browser

The Terraformer ArcGIS Parser can be used in the browser with some simple includes.

```html
  <!-- Load the main Terraformer library -->
  <script src="terraformer.min.js" type="text/javascript"></script>
  
  <!-- Load the ArcGIS Parser -->
  <script src="terraformer-arcgis-parser.min.js" type="text/javascript"></script>
  
  <!-- Use it! -->
  <script>
    var primitive = Terraformer.ArcGIS.parse({
      x:"-122.6764",
      y:"45.5165",
      spatialReference: {
        wkid: 4326
      }
    });

    // take a Terraformer.Primitive or GeoJSON and convert it to ArcGIS JSON
    var point = Terraformer.ArcGIS.convert({
      "type": "Point",
      "coordinates": [45.5165, -122.6764]
    });
  </script>
  ```

### Notes

It is important to note that Terraformer **DOES NOT** attempt to set an ID on the feature is outputs when converting ArcGIS into GeoJSON. You should always set an id after parsing it to GeoJSON. This is because the concept a unique feature id does not exist in the ArcGIS spec.

Terraformer will also handle converting `FeatureCollection` and `GeometryCollection` objects to arrays of ArcGIS geometries or features. However it will **Not** do this in reverse as there is no official structure for arrays of features and geometries in ArcGIS and all the output features will not have `id` properties. See [this issue](https://github.com/Esri/Terraformer/issues/104) for more details.

[](Esri Tags: Terraformer GeoJSON ArcGIS)
[](Esri Language: JavaScript)
