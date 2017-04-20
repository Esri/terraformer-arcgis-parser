/// <reference types="geojson" />

export interface SpatialReference {
}

export interface SpatialReferenceWkid extends SpatialReference {
    wkid?: number;
    latestWkid?: number;
    vcsWkid?: number;
    latestVcsWkid?: number;
}

export interface SpatialReferenceWkt extends SpatialReference {
    wkt?: string;
    latestWkt?: string;
}

export interface Geometry {
    spatialReference?: SpatialReference;
}

export interface HasZM {
    hasZ?: boolean;
    hasM?: boolean;
}

export interface Point extends Geometry {
    x: number;
    y: number;
    z?: number;
    m?: number;
}

export interface Polyline extends HasZM, Geometry {
    paths: number[][][];
}

export interface Polygon extends HasZM, Geometry {
    rings: number[][][];
}

export interface Multipoint extends HasZM, Geometry {
    points: number[][];
}

export interface Envelope extends Geometry {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;

    zmin?: number;
    zmax?: number;

    mmin?: number;
    mmax?: number;
}

export interface Feature {
    geometry: Geometry;
    attributes: any;
}

export interface Field {
    name: string;
    type: string;
    alias?: string;
    length?: number;
}

export type esriGeometryType = "esriGeometryPoint" | "esriGeometryMultipoint" | "esriGeometryPolyline" |
                               "esriGeometryPolygon" | "esriGeometryEnvelope";

export interface FeatureSet extends HasZM {
    objectIdFieldName?: string; // optional
    globalIdFieldName?: string; // optional
    displayFieldName?: string; // optional
    geometryType?: esriGeometryType; // for feature layers only
    spatialReference?: SpatialReference; // for feature layers only.
    fields?: Field[];
    features: Feature[];
}

export interface ParseOptions {
    sr?: number;
    idAttribute?: string;
}
export interface ConvertOptions {
    idAttribute?: string;
}

export function parse<T extends Geometry>(json: T, options?: ParseOptions): GeoJSON.GeometryObject;
export function parse<T extends GeoJSON.GeometryObject>(json: Feature, options?: ParseOptions): GeoJSON.Feature<T>;

export function convert<T extends GeoJSON.GeometryObject>(geoJSON: GeoJSON.FeatureCollection<T>, options?: ConvertOptions): FeatureSet;
export function convert<T extends GeoJSON.GeometryObject>(geoJSON: GeoJSON.Feature<T>, options?: ConvertOptions): Feature;
export function convert<T extends GeoJSON.GeometryObject>(geoJSON: T, options?: ConvertOptions): Geometry;
