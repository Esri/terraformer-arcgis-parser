# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [unreleased]

## [1.0.5] - 2016-08-16

### Fixed
* Check for GeoJSON feature `id`s before assigning to output [#24](https://github.com/Esri/terraformer-arcgis-parser/pull/24)
* correct conversion of polygons with outer rings not containing holes [#28](https://github.com/Esri/terraformer-arcgis-parser/pull/28)

### Added
* typings for TypeScript folks (thx [@JeffJacobson](https://github.com/JeffJacobson)) [#34](https://github.com/Esri/terraformer-arcgis-parser/pull/34)

## [1.0.4] - 2014-06-17
### Fixed
* Account for breaking change in `Terraformer`

### Added
* support for `z` and `m` conversion

## [1.0.3] - 2015-02-24
### Fixed
* valid output on both ends of conversion [#19](https://github.com/Esri/terraformer-arcgis-parser/issues/19)

## [1.0.2] - 2014-02-10
### Added
* `parseCompressedGeometry()` [#10](https://github.com/Esri/terraformer-arcgis-parser/issues/10)

### Fixed
* `parse()` and `convert()` now close polygons during conversion. [#9](https://github.com/Esri/terraformer-arcgis-parser/issues/9)
* `parse()` now handles `compressedGeometry`

## [1.0.1] - 2013-12-04
### Fixed
* `ReferenceError: sr is not defined` in `ArcGIS.convert()`

## [1.0.0] - 2013-11-12

Initial Release.  Also available on NPM and Bower

```
npm install terraformer-arcgis-parser
bower install terraformer-arcgis-parser
```

[unreleased]: https://github.com/Esri/terraformer-arcgis-parser/compare/v1.0.5...HEAD
[1.0.5]: https://github.com/Esri/terraformer-arcgis-parser/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/Esri/terraformer-arcgis-parser/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/Esri/terraformer-arcgis-parser/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/Esri/terraformer-arcgis-parser/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/Esri/terraformer-arcgis-parser/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Esri/terraformer-arcgis-parser/releases/tag/v1.0.0
