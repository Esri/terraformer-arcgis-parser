if(typeof module === "object"){
  var Terraformer = require("terraformer");
  Terraformer.ArcGIS = require("../terraformer-arcgis-parser.js");
}

describe("ArcGIS Tools", function(){

  it("should convert a GeoJSON Point to an ArcGIS Point", function() {
    var input = {
      "type": "Point",
      "coordinates": [-58.7109375,47.4609375]
    };

    var output = Terraformer.ArcGIS.convert(input);

    expect(output).toEqual({
      "x":-58.7109375,
      "y":47.4609375,
      "spatialReference":{
        "wkid":4326
      }
    });
  });

  it("should convert a GeoJSON Point with Z to an ArcGIS Point with Z", function() {
    var input = {
      "type": "Point",
      "coordinates": [-58.7109375,47.4609375, 100]
    };

    var output = Terraformer.ArcGIS.convert(input);

    expect(output).toEqual({
      "x":-58.7109375,
      "y":47.4609375,
      "z": 100,
      "spatialReference":{
        "wkid":4326
      }
    });
  });

  it("should convert a GeoJSON Point with Z and M to an ArcGIS Point with Z and M", function() {
    var input = {
      "type": "Point",
      "coordinates": [-58.7109375,47.4609375, 100, 50]
    };

    var output = Terraformer.ArcGIS.convert(input);

    expect(output).toEqual({
      "x":-58.7109375,
      "y":47.4609375,
      "z": 100,
      "m": 50,
      "spatialReference":{
        "wkid":4326
      }
    });
  });

  it("should convert a GeoJSON Null Island to an ArcGIS Point", function() {
    var input = {
      "type": "Point",
      "coordinates": [0,0]
    };

    var output = Terraformer.ArcGIS.convert(input);

    expect(output).toEqual({
      "x":0,
      "y":0,
      "spatialReference":{
        "wkid":4326
      }
    });
  });

  it("should convert a GeoJSON LineString to an ArcGIS Polyline", function() {
    var input = {
      "type": "LineString",
      "coordinates": [ [21.4453125,-14.0625],[33.3984375,-20.7421875],[38.3203125,-24.609375] ]
    };

    var output = Terraformer.ArcGIS.convert(input);

    expect(output).toEqual({
      "paths":[
        [ [21.4453125,-14.0625],[33.3984375,-20.7421875],[38.3203125,-24.609375] ]
      ],
      "spatialReference":{
        "wkid":4326
      }
    });
  });

  it("should convert a GeoJSON Polygon to an ArcGIS Polygon", function() {
    var input = {
      "type": "Polygon",
      "coordinates": [
        [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625],[41.8359375,71.015625] ]
      ]
    };

    var output = Terraformer.ArcGIS.convert(input);

    expect(output).toEqual({
      "rings":[
        [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625],[41.8359375,71.015625] ]
      ],
      "spatialReference":{
        "wkid":4326
      }
    });
  });

  it("should convert a GeoJSON Polygon w/ a hole to an ArcGIS Polygon w/ 2 rings", function() {
    var input = {
      "type": "Polygon",
      "coordinates": [
        [ [100.0,0.0],[101.0,0.0],[101.0,1.0],[100.0,1.0],[100.0,0.0] ],
        [ [100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2] ]
      ]
    };

    var output = Terraformer.ArcGIS.convert(input);

    expect(output).toEqual({
      "rings": [
        [ [100, 0], [100, 1], [101, 1], [101, 0], [100, 0] ],
        [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
      ],
      "spatialReference":{
        "wkid":4326
      }
    });
  });

  it("should strip invalid rings when converting a GeoJSON Polygon to and ArcGIS Polygon", function() {
    var input = {
      "type": "Polygon",
      "coordinates": [
        [ [100.0,0.0],[101.0,0.0],[101.0,1.0],[100.0,1.0],[100.0,0.0] ],
        [ [100.2,0.2],[100.8,0.2],[100.2,0.2] ]
      ]
    };

    var output = Terraformer.ArcGIS.convert(input);

    expect(output).toEqual({
      "rings": [
        [ [100, 0], [100, 1], [101, 1], [101, 0], [100, 0] ]
      ],
      "spatialReference":{
        "wkid":4326
      }
    });
  });

  it("should close ring when converting a GeoJSON Polygon w/ a hole to an ArcGIS Polygon", function() {
    var input = {
      "type": "Polygon",
      "coordinates": [
        [ [100.0,0.0],[101.0,0.0],[101.0,1.0],[100.0,1.0] ],
        [ [100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8] ]
      ]
    };

    var output = Terraformer.ArcGIS.convert(input);

    expect(output).toEqual({
      "rings": [
        [ [100, 0], [100, 1], [101, 1], [101, 0], [100, 0] ],
        [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
      ],
      "spatialReference":{
        "wkid":4326
      }
    });
  });

  it("should convert a GeoJSON MultiPoint to an ArcGIS Multipoint", function() {
    var input = {
      "type": "MultiPoint",
      "coordinates": [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625] ]
    };

    var output = Terraformer.ArcGIS.convert(input);

    expect(output).toEqual({
      "points":[ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625] ],
      "spatialReference":{
        "wkid":4326
      }
    });
  });

  it("should convert a GeoJSON MultiLineString to an ArcGIS Polyline", function() {
    var input = {
      "type": "MultiLineString",
      "coordinates": [
        [ [41.8359375,71.015625],[56.953125,33.75] ],
        [ [21.796875,36.5625],[47.8359375,71.015625] ]
      ]
    };

    var output = Terraformer.ArcGIS.convert(input);

    expect(output).toEqual({
      "paths":[
        [ [41.8359375,71.015625],[56.953125,33.75] ],
        [ [21.796875,36.5625],[47.8359375,71.015625] ]
      ],
      "spatialReference":{
        "wkid":4326
      }
    });
  });

  it("should convert a GeoJSON MultiPolygon to an ArcGIS Polygon", function() {
    var input = {
      "type": "MultiPolygon",
      "coordinates": [
        [
          [ [102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0] ]
        ],
        [
          [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
        ]
      ]
    };

    var output = Terraformer.ArcGIS.convert(input);
    expect(output).toEqual({
      "rings":[
        [ [102, 2], [102, 3], [103, 3], [103, 2], [102, 2] ],
        [ [100, 0], [100, 1], [101, 1], [101, 0], [100, 0] ]
      ],
      "spatialReference": {
        "wkid":4326
      }
    });
  });

  it("should convert a GeoJSON MultiPolygon w/ holes to an ArcGIS Polygon", function() {
    var input = {
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
    };

    var output = Terraformer.ArcGIS.convert(input);
    expect(output).toEqual({
      "spatialReference": {
        "wkid": 4326
      },
      "rings": [
        [ [102,2],[102,3],[103,3],[103,2],[102,2] ],
        [ [100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2] ],
        [ [100,0],[100,1],[101,1],[101,0],[100,0] ]
      ]
    });
  });

  it("should close rings when converting a GeoJSON MultiPolygon w/ holes to an ArcGIS Polygon", function() {
    var input = {
      "type": "MultiPolygon",
      "coordinates": [
        [
          [ [102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0] ]
        ],
        [
          [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0] ],
          [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8] ]
        ]
      ]
    };

    var output = Terraformer.ArcGIS.convert(input);
    expect(output).toEqual({
      "spatialReference": {
        "wkid": 4326
      },
      "rings": [
        [ [102,2],[102,3],[103,3],[103,2],[102,2] ],
        [ [100.2,0.2],[100.8,0.2],[100.8,0.8],[100.2,0.8],[100.2,0.2] ],
        [ [100,0],[100,1],[101,1],[101,0],[100,0] ]
      ]
    });
  });

  it('should still parse holes outside the outer rings', function(){
    var input = {
      "rings": [
        [ [-122.45,45.63], [-122.45,45.68], [-122.39,45.68], [-122.39,45.63], [-122.45,45.63] ],
        [ [-122.46,45.64], [-122.4,45.64], [-122.4,45.66], [-122.46,45.66], [-122.46,45.64] ]
      ]
    }

    var output = Terraformer.ArcGIS.parse(input);

    var expected = [
      [ [-122.45,45.63], [-122.39,45.63], [-122.39,45.68], [-122.45,45.68], [-122.45,45.63] ],
      [ [-122.46,45.64], [-122.46,45.66], [-122.4,45.66], [-122.4,45.64], [-122.46,45.64] ]
    ];

    expect(output.coordinates).toEqual(expected);
  });

  it("should convert a GeoJSON Feature into an ArcGIS Feature", function(){
    var input = {
      "type":"Feature",
      "id": "foo",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625],[41.8359375,71.015625] ]
        ]
      },
      "properties": {
        "foo":"bar"
      }
    };

    var output = Terraformer.ArcGIS.convert(input);

    expect(output).toEqual({
      "geometry":{
        "rings":[
          [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625],[41.8359375,71.015625] ]
        ],
        "spatialReference":{
          "wkid":4326
        }
      },
      "attributes": {
        "foo":"bar",
        "OBJECTID": "foo"
      }
    });
  });

  it("should convert a GeoJSON Feature into an ArcGIS Feature w/ a custom id", function(){
    var input = {
      "type":"Feature",
      "id": "foo",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625],[41.8359375,71.015625] ]
        ]
      },
      "properties": {
        "foo":"bar"
      }
    };

    var output = Terraformer.ArcGIS.convert(input, {
      idAttribute: "myId"
    });

    expect(output).toEqual({
      "geometry":{
        "rings":[
          [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625],[41.8359375,71.015625] ]
        ],
        "spatialReference":{
          "wkid":4326
        }
      },
      "attributes": {
        "foo":"bar",
        "myId": "foo"
      }
    });
  });

  it("should allow converting a GeoJSON Feature to an ArcGIS Feature with no properties or geometry", function(){
    var input = {
      "type":"Feature",
      "id": "foo",
      "geometry": null,
      "properties": null
    };

    var output = Terraformer.ArcGIS.convert(input);

    expect(output).toEqual({
      "attributes": {
        "OBJECTID": "foo"
      }
    });
  });

  it("should convert a GeoJSON FeatureCollection into an array of ArcGIS Feature JSON", function(){
    var input = {
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
    };

    var output = Terraformer.ArcGIS.convert(input);

    expect(output).toEqual([{
      "geometry": {
        "x": 102,
        "y": 0.5,
        "spatialReference": {
          "wkid": 4326
        }
      },
      "attributes": {
        "prop0": "value0"
      }
    }, {
      "geometry": {
        "paths": [
          [[102, 0],[103, 1],[104, 0],[105, 1]]
        ],
        "spatialReference": {
          "wkid": 4326
        }
      },
      "attributes": {
        "prop0": "value0"
      }
    }, {
      "geometry": {
        "rings": [
          [ [100,0],[100,1],[101,1],[101,0],[100,0] ]
        ],
        "spatialReference": {
          "wkid": 4326
        }
      },
      "attributes": {
        "prop0": "value0"
      }
    }]);
  });

  it("should convert a GeoJSON GeometryCollection into an array of ArcGIS Geometries", function(){
    var input = {
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
    };

    var output = Terraformer.ArcGIS.convert(input);

    expect(output).toEqual([{
      "rings": [
        [[-95, 43],[-95, 50],[-90, 50],[-91, 42],[-95, 43]]
      ],
      "spatialReference": {
        "wkid": 4326
      }
    }, {
      "paths": [
        [[-89, 42],[-89, 50],[-80, 50],[-80, 42]]
      ],
      "spatialReference": {
        "wkid": 4326
      }
    }, {
      "x": -94,
      "y": 46,
      "spatialReference": {
        "wkid": 4326
      }
    }]);
  });

  it("should not modify the original GeoJSON object", function(){
    var primitive = new Terraformer.FeatureCollection({
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

    var original = JSON.stringify(primitive);

    Terraformer.ArcGIS.convert(primitive);

    expect(original).toEqual(JSON.stringify(primitive));
  });

  it("if the GeoJSON includes a custom crs, output spatial reference should not be set", function() {
    var input = {
      "type": "Point",
      "coordinates": [123,456],
      "crs": {
        "type": "name",
        "properties": {
          "name": "urn:ogc:def:crs:EPSG::2913"
        }
      }
    };

    var output = Terraformer.ArcGIS.convert(input);

    expect(output).toEqual({
      "x": 123,
      "y": 456,
      "spatialReference": null
    });
  });

  it("if the GeoJSON includes a custom linked crs, output spatial reference should not be set", function() {
    var input = {
      "type": "Point",
      "coordinates": [123,456],
      "crs": {
        "type": "link",
        "properties": {
          "href": "http://spatialreference.org/ref/sr-org/7/ogcwkt/",
          "type": "ogcwkt"
        }
      },
    };

    var output = Terraformer.ArcGIS.convert(input);
    expect(output).toEqual({
      "x": 123,
      "y": 456,
      "spatialReference": null
    });
  });

  it("should parse an ArcGIS Point in a Terraformer GeoJSON Point", function() {
    var input = {
      "x": -66.796875,
      "y": 20.0390625,
      "spatialReference": {
        "wkid": 4326
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.coordinates).toEqual([-66.796875,20.0390625]);
    expect(output instanceof Terraformer.Point).toBeTruthy();
  });

  it("should parse an ArcGIS Point with Z in a Terraformer GeoJSON Point with Z", function() {
    var input = {
      "x": -66.796875,
      "y": 20.0390625,
      "z": 100,
      "spatialReference": {
        "wkid": 4326
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.coordinates).toEqual([-66.796875,20.0390625, 100]);
    expect(output instanceof Terraformer.Point).toBeTruthy();
  });

  it("should parse an ArcGIS Point with Z and M in a Terraformer GeoJSON Point with Z and M", function() {
    var input = {
      "x": -66.796875,
      "y": 20.0390625,
      "z": 100,
      "m": 50,
      "spatialReference": {
        "wkid": 4326
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.coordinates).toEqual([-66.796875,20.0390625, 100, 50]);
    expect(output instanceof Terraformer.Point).toBeTruthy();
  });

  it("should parse an ArcGIS Point with M in a Terraformer GeoJSON Point with M", function() {
    var input = {
      "x": -66.796875,
      "y": 20.0390625,
      "m": 50,
      "spatialReference": {
        "wkid": 4326
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.coordinates).toEqual([-66.796875,20.0390625, undefined, 50]);
    expect(output instanceof Terraformer.Point).toBeTruthy();
  });

  it("should parse an ArcGIS Null Island in a Terraformer GeoJSON Point", function() {
    var input = {
      "x": 0,
      "y": 0,
      "spatialReference": {
        "wkid": 4326
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.coordinates).toEqual([0,0]);
    expect(output instanceof Terraformer.Point).toBeTruthy();
  });

  it("should parse an ArcGIS Polyline in a Terraformer GeoJSON LineString", function() {
    var input = {
      "paths": [
        [ [6.6796875,47.8125],[-65.390625,52.3828125],[-52.3828125,42.5390625] ]
      ],
      "spatialReference": {
        "wkid": 4326
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.coordinates).toEqual([ [6.6796875,47.8125],[-65.390625,52.3828125],[-52.3828125,42.5390625] ]);
    expect(output instanceof Terraformer.LineString).toBeTruthy();
  });

  it("should parse an ArcGIS Polygon in a Terraformer GeoJSON Polygon", function() {
    var input = {
      "rings": [
        [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625],[41.8359375,71.015625] ]
      ],
      "spatialReference": {
        "wkid": 4326
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.coordinates).toEqual([ [ [41.8359375,71.015625],[21.796875,36.5625],[56.953125,33.75],[41.8359375,71.015625] ] ]);
    expect(output.type).toEqual("Polygon");
  });

  it("should close rings when parsing an ArcGIS Polygon in a Terraformer GeoJSON Polygon", function() {
    var input = {
      "rings": [
        [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625]]
      ],
      "spatialReference": {
        "wkid": 4326
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.coordinates).toEqual([ [ [41.8359375,71.015625],[21.796875,36.5625],[56.953125,33.75],[41.8359375,71.015625] ] ]);
    expect(output.type).toEqual("Polygon");
  });

  it("should parse an ArcGIS Multipoint in a Terraformer GeoJSON MultiPoint", function() {
    var input = {
      "points":[ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625] ],
      "spatialReference":{
        "wkid":4326
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.coordinates).toEqual([ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625] ]);
    expect(output instanceof Terraformer.MultiPoint).toBeTruthy();
  });

  it("should parse an ArcGIS Polyline in a Terraformer GeoJSON MultiLineString", function() {
    var input = {
      "paths":[
        [ [41.8359375,71.015625],[56.953125,33.75] ],
        [ [21.796875,36.5625],[41.8359375,71.015625] ]
      ],
      "spatialReference":{
        "wkid":4326
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.coordinates).toEqual([[ [41.8359375,71.015625],[56.953125,33.75] ], [ [21.796875,36.5625],[41.8359375,71.015625] ]]);
    expect(output instanceof Terraformer.MultiLineString).toBeTruthy();
  });

  it("should parse an ArcGIS Polygon in a Terraformer GeoJSON MultiPolygon", function() {
    var input = {
      "rings":[
        [[-122.63,45.52],[-122.57,45.53],[-122.52,45.50],[-122.49,45.48],[-122.64,45.49],[-122.63,45.52],[-122.63,45.52]],
        [[-83,35],[-74,35],[-74,41],[-83,41],[-83,35]]
      ],
      "spatialReference": {
        "wkid":4326
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.coordinates).toEqual([
      [
        [ [-122.63,45.52],[-122.63,45.52],[-122.64,45.49],[-122.49,45.48],[-122.52,45.5],[-122.57,45.53],[-122.63,45.52] ]
      ],
      [
        [ [-83,35],[-74,35],[-74,41],[-83,41],[-83,35] ]
      ]
    ]);
    expect(output.type).toEqual("MultiPolygon");
  });

  it("should strip invalid rings when converting ArcGIS Polygons to GeoJSON", function() {
    var input = {
      "rings":[
        [[-122.63,45.52],[-122.57,45.53],[-122.52,45.50],[-122.49,45.48],[-122.64,45.49],[-122.63,45.52],[-122.63,45.52]],
        [[-83,35],[-74,35],[-83,35]] // closed but too small
      ],
      "spatialReference": {
        "wkid":4326
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.coordinates).toEqual([
      [ [-122.63, 45.52],[-122.63, 45.52],[-122.64, 45.49],[-122.49, 45.48],[-122.52, 45.5],[-122.57, 45.53],[-122.63, 45.52] ]
    ]);
    expect(output.type).toEqual("Polygon");
  });

  it("should properly close rings when converting an ArcGIS Polygon in a Terraformer GeoJSON MultiPolygon", function() {
    var input = {
      "rings":[
        [[-122.63,45.52],[-122.57,45.53],[-122.52,45.50],[-122.49,45.48],[-122.64,45.49]],
        [[-83,35],[-74,35],[-74,41],[-83,41]]
      ],
      "spatialReference": {
        "wkid":4326
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.coordinates).toEqual([
      [
        [ [-122.63, 45.52],[-122.64, 45.49],[-122.49, 45.48],[-122.52, 45.5],[-122.57, 45.53],[-122.63, 45.52] ]
      ],
      [
        [ [-83,35],[-74,35],[-74,41],[-83,41],[-83,35] ]
      ]
    ]);
    expect(output.type).toEqual("MultiPolygon");
  });

  it("should parse an ArcGIS MultiPolygon with holes in web mercator to a GeoJSON MultiPolygon", function(){
    var input = {
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
    };
    var output = Terraformer.ArcGIS.parse(input);

    expect(output.coordinates).toEqual([
      [
        [ [-100.74462180954974, 39.95017165502381],[-100.78856739324887, 34.85708140996771],[-94.41650267263967, 34.89313438177965],[-94.50439384003792, 39.91647453608879],[-100.74462180954974, 39.95017165502381] ],
        [ [-96.83349180978595, 37.23732027507514],[-95.42724211456674, 36.357601429255965],[-96.5698183075912, 35.57512048069255],[-97.31689323047635, 35.967330282988534],[-96.83349180978595, 37.23732027507514] ],
        [ [-99.68993678392353, 39.341088433448896],[-98.06395917020868, 39.341088433448896],[-98.06395917020868, 38.210554846669694],[-98.67919734199646, 37.86444431771113],[-99.68993678392353, 38.24507658785885],[-99.68993678392353, 39.341088433448896] ]
      ],
      [
        [ [-101.4916967324349, 38.24507658785885], [-103.68895795108557, 38.03770050767439], [-103.95263145328033, 36.03843312329154], [-101.44775114873578, 36.073960493943744], [-101.4916967324349, 38.24507658785885] ]
      ]
    ]);
    expect(output.type).toEqual("MultiPolygon");
  });

  it("should parse an ArcGIS Feature into a Terraformer Feature", function(){
    var input = {
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
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.geometry.coordinates).toEqual([
      [ [41.8359375,71.015625],[21.796875,36.5625],[56.953125, 33.75],[41.8359375,71.015625] ]
    ]);
    expect(output.geometry.type).toEqual("Polygon");
    expect(output instanceof Terraformer.Feature).toBeTruthy();
  });

  it("should parse an ArcGIS Feature w/ OBJECTID into a Terraformer Feature", function(){
    var input = {
      "geometry": {
        "rings": [
          [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625],[41.8359375,71.015625] ]
        ],
        "spatialReference": {
          "wkid": 4326
        }
      },
      "attributes": {
        "OBJECTID": 123
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.id).toEqual(123);
  });

  it("should parse an ArcGIS Feature w/ FID into a Terraformer Feature", function(){
    var input = {
      "geometry": {
        "rings": [
          [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625],[41.8359375,71.015625] ]
        ],
        "spatialReference": {
          "wkid": 4326
        }
      },
      "attributes": {
        "FID": 123
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.id).toEqual(123);
  });

  it("should parse an ArcGIS Feature w/ a custom id into a Terraformer Feature", function(){
    var input = {
      "geometry": {
        "rings": [
          [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625],[41.8359375,71.015625] ]
        ],
        "spatialReference": {
          "wkid": 4326
        }
      },
      "attributes": {
        "FooId": 123
      }
    };

    var output = Terraformer.ArcGIS.parse(input, {
      idAttribute: "FooId"
    });

    expect(output.id).toEqual(123);
  });

  it("should parse an ArcGIS Feature w/ empty attributes into a Terraformer Feature", function(){
    var input = {
      "geometry": {
        "rings": [
          [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625],[41.8359375,71.015625] ]
        ],
        "spatialReference": {
          "wkid": 4326
        }
      },
      "attributes": {}
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.geometry.coordinates).toEqual([
      [ [41.8359375,71.015625],[21.796875,36.5625],[56.953125,33.75],[41.8359375,71.015625] ]
    ]);
    expect(output.geometry.type).toEqual("Polygon");
    expect(output instanceof Terraformer.Feature).toBeTruthy();
  });

  it("should parse an ArcGIS Feature w/ no attributes into a Terraformer Feature", function(){
    var input = {
      "geometry": {
        "rings": [
          [ [41.8359375,71.015625],[56.953125,33.75],[21.796875,36.5625],[41.8359375,71.015625] ]
        ],
        "spatialReference": {
          "wkid": 4326
        }
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.geometry.coordinates).toEqual([
      [ [41.8359375,71.015625],[21.796875,36.5625],[56.953125,33.75],[41.8359375,71.015625] ]
    ]);
    expect(output.geometry.type).toEqual("Polygon");
    expect(output instanceof Terraformer.Feature).toBeTruthy();
    expect(output.properties).toEqual(null);
  });

  it("should parse an ArcGIS Feature w/ no geometry into a Terraformer Feature", function(){
    var input = {
      "attributes": {
        "foo": "bar"
      }
    };

    var output = Terraformer.ArcGIS.parse(input);
    expect(output.geometry).toEqual(null);
    expect(output instanceof Terraformer.Feature).toBeTruthy();
    expect(output.properties.foo).toEqual("bar");
  });

  it("should not reproject to WGS84/4326 while parsing", function(){
    var input = {
      "x": -13580977.876779145,
      "y": 5621521.486191948,
      "spatialReference": {
        "wkid": 3857
      }
    };

    var output = Terraformer.ArcGIS.parse(input);
    expect(output.coordinates).toEqual([-13580977.876779145, 5621521.486191948]);
  });

  it("should not modify the original ArcGIS Geometry", function(){
    var input = {
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
    };

    var original = JSON.stringify(input);

    Terraformer.ArcGIS.parse(input);

    expect(original).toEqual(JSON.stringify(input));
  });

  it("should decompress ArcGIS compressed geometry features into GeoJSON Features", function(){
    var input = {
      "compressedGeometry": "+1m91-66os4+1poms+1+91+3+3j"
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.type).toEqual("Feature");
    expect(output.geometry.type).toEqual("LineString");
    expect(output.geometry.coordinates).toEqual([ [ -117.1816137447153, 34.057461545380946 ],[ -117.18159575425025, 34.06266078978142 ], [ -117.18154178285509, 34.06472969326257 ] ]);
  });

  it("should decompress ArcGIS compressed geometries into Polylines", function(){
    var output = Terraformer.ArcGIS.parseCompressedGeometry("+1m91-66os4+1poms+1+91+3+3j");

    expect(output.type).toEqual("LineString");
    expect(output.coordinates).toEqual([ [ -117.1816137447153, 34.057461545380946 ],[ -117.18159575425025, 34.06266078978142 ], [ -117.18154178285509, 34.06472969326257 ] ]);
  });

  it("should parse an ArcGIS Extent into a Terraformer GeoJSON Polygon", function () {
    var input = {
      "xmax": -35.5078125,
      "ymax": 41.244772343082076,
      "xmin": -13.7109375,
      "ymin": 54.36775852406841,
      "spatialReference": {
        "wkid": 4326
      }
    };

    var output = Terraformer.ArcGIS.parse(input);

    expect(output.coordinates).toEqual([[[-35.5078125, 41.244772343082076], [-13.7109375, 41.244772343082076], [-13.7109375, 54.36775852406841], [-35.5078125, 54.36775852406841], [-35.5078125, 41.244772343082076]]]);
    expect(output.type).toEqual("Polygon");
  });

});
