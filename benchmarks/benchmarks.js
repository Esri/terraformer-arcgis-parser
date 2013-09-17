ArcGIS = require('../terraformer-arcgis-parser');

var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();

// add tests
suite

.add('ArcGIS Point to GeoJSON Point', function() {
  ArcGIS.parse({
    "x": -66.796875,
    "y": 20.0390625,
    "spatialReference": {
      "wkid": 4326
    }
  });
})

.add('ArcGIS Polyline to GeoJSON LineString', function() {
  ArcGIS.parse({
    "paths": [
      [ [6.6796875,47.8125],[-65.390625,52.3828125],[-52.3828125,42.5390625] ]
    ],
    "spatialReference": {
      "wkid": 4326
    }
  });
})

.add('ArcGIS Polygon to GeoJSON Polygon', function() {
  ArcGIS.parse({
    "rings": [
      [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625],[41.8359375,71.015625] ]
    ],
    "spatialReference": {
      "wkid": 4326
    }
  });
})

.add('ArcGIS Multipoint to GeoJSON Multipoint', function(){
  ArcGIS.parse({
    "points":[ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625] ],
    "spatialReference":{
      "wkid":4326
    }
  });
})

.add('ArcGIS Polyline w/ 2 Paths to GeoJSON MultiLineString', function(){
  ArcGIS.parse({
    "paths":[
      [ [41.8359375,71.015625],[56.953125,33.75] ],
      [ [21.796875,36.5625],[41.8359375,71.015625] ]
    ],
    "spatialReference":{
      "wkid":4326
    }
  });
})

.add('ArcGIS Polygon w/ 2 Rings to GeoJSON MultiPolygon', function(){
  ArcGIS.parse({
    "rings":[
      [[-122.63,45.52],[-122.57,45.53],[-122.52,45.50],[-122.49,45.48],[-122.64,45.49],[-122.63,45.52],[-122.63,45.52]],
      [[-83,35],[-74,35],[-74,41],[-83,41],[-83,35]]
    ],
    "spatialReference": {
      "wkid":4326
    }
  });
})

.add('ArcGIS Polygon w/ Holes into GeoJSON MultiPolygon', function(){
  ArcGIS.parse({
    "type":"polygon",
    "rings":[
      [ [-100.74462180954974,39.95017165502381],[-94.50439384003792,39.91647453608879],[-94.41650267263967,34.89313438177965],[-100.78856739324887,34.85708140996771],[-100.74462180954974,39.95017165502381] ],
      [ [-99.68993678392353,39.341088433448896],[-99.68993678392353,38.24507658785885],[-98.67919734199646,37.86444431771113],[-98.06395917020868,38.210554846669694],[-98.06395917020868,39.341088433448896],[-99.68993678392353,39.341088433448896] ],
      [ [-96.83349180978595,37.23732027507514],[-97.31689323047635,35.967330282988534],[-96.5698183075912,35.57512048069255],[-95.42724211456674,36.357601429255965],[-96.83349180978595,37.23732027507514] ],
      [ [-101.4916967324349,38.24507658785885],[-101.44775114873578,36.073960493943744],[-103.95263145328033,36.03843312329154],[-103.68895795108557,38.03770050767439],[-101.4916967324349,38.24507658785885] ]
    ],
    "spatialReference":{
      "wkid":4326
    }
  });
})

.add('ArcGIS Feature to GeoJSON Feature', function(){
  ArcGIS.parse({
    "geometry": {
      "rings": [
        [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625],[41.8359375,71.015625] ]
      ],
      "spatialReference": {
        "wkid": 4326
      }
    },
    "attributes": {
      "foo": "bar"
    }
  });
})

.add('GeoJSON Point to ArcGIS Point', function() {
  ArcGIS.convert({
    "type": "Point",
    "coordinates": [-58.7109375,47.4609375]
  });
})

.add('GeoJSON LineString to ArcGIS Polyline', function() {
  ArcGIS.convert({
    "type": "LineString",
    "coordinates": [ [21.4453125,-14.0625],[33.3984375,-20.7421875],[38.3203125,-24.609375] ]
  });
})

.add('GeoJSON Polygon to ArcGIS Polygon', function() {
  ArcGIS.convert({
    "type": "Polygon",
    "coordinates": [
      [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625],[41.8359375,71.015625] ]
    ]
  });
})

.add('GeoJSON Polygon w/ hole to ArcGIS Polygon', function(){
  ArcGIS.convert({
    "type": "Polygon",
    "coordinates": [
      [ [100.0,0.0],[101.0,0.0],[101.0,1.0],[100.0,1.0],[100.0,0.0] ],
      [ [100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2] ]
    ]
  });
})

.add('GeoJSON Multipoint to ArcGIS Multipoint', function(){
  ArcGIS.convert({
    "type": "MultiPoint",
    "coordinates": [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625] ]
  });
})

.add('GeoJSON MultiLineString to ArcGIS Polyline', function(){
  ArcGIS.convert({
    "type": "MultiLineString",
    "coordinates": [
      [ [41.8359375,71.015625],[56.953125,33.75] ],
      [ [21.796875,36.5625],[47.8359375,71.015625] ]
    ]
  });
})

.add('GeoJSON MultiPolygon to ArcGIS MultiPolygon', function(){
  ArcGIS.convert({
    "type": "MultiPolygon",
    "coordinates": [
      [
        [ [102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0] ]
      ],
      [
        [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
      ]
    ]
  });
})

.add('GeoJSON MultiPolygon w/ hole to ArcGIS Polygon', function(){
  ArcGIS.convert({
    "type": "MultiPolygon",
    "coordinates": [
      [
        [ [102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0] ]
      ],
      [
        [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ],
        [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
      ]
    ]
  });
})

.add('GeoJSON Feature to ArcGIS Feature', function(){
  ArcGIS.convert({
    "type":"Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625],[41.8359375,71.015625] ]
      ]
    },
    "properties": {
      "foo":"bar"
    }
  });
})

.add('GeoJSON Feature Collection to Array of ArcGIS Features', function(){
  ArcGIS.convert({
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [102.0, 0.5]
      },
      "properties": {
        "prop0": "value0"
      }
    }, {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [102.0, 0.0],[103.0, 1.0],[104.0, 0.0],[105.0, 1.0]
        ]
      },
      "properties": {
        "prop0": "value0"
      }
    }, {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [ [100.0, 0.0],[101.0, 0.0],[101.0, 1.0],[100.0, 1.0],[100.0, 0.0] ]
        ]
      },
      "properties": {
        "prop0": "value0"
      }
    }]
  });
})

.add('GeoJSON Geometry Collection to Array of ArcGIS Geometries', function(){
  ArcGIS.convert({
    "type" : "GeometryCollection",
    "geometries" : [{
      "type" : "Polygon",
      "coordinates" : [[[-95, 43], [-95, 50], [-90, 50], [-91, 42], [-95, 43]]]
    }, {
      "type" : "LineString",
      "coordinates" : [[-89, 42], [-89, 50], [-80, 50], [-80, 42]]
    }, {
      "type" : "Point",
      "coordinates" : [-94, 46]
    }]
  });
})

.on('cycle', function(event) {
  console.log(String(event.target));
})

// .on('complete', function() {
//   console.log('Fastest is ' + this.filter('fastest').pluck('name'));
// })

.run({ 'async': false });