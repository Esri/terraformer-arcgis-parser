# Terraformer ArcGIS File Parser

> Convert .geojson and Esri .json back and forth.

## Install

```bash
$ git clone https://github.com/Esri/terraformer-arcgis-parser
$ cd ./terraformer-arcgis-parser/examples
$ npm install
```

## Use

```
$ npm run convert bars.geojson
> bars.json

$ npm run parse colorado.json
> colorado.geojson
```

sample [`.geojson`](https://raw.githubusercontent.com/benbalter/dc-wifi-social/master/bars.geojson) / sample geoservices[ `.json`](http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3/query?where=STATE_NAME+%3D+%27Colorado%27&maxAllowableOffset=0.01&outSR=4326&f=pjson)
