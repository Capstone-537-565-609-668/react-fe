import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
const wkx = require("wellknown");

const MapOutput = ({ data }) => {
  // data is an array of polygons like:
  //   const wktData =
  // "POLYGON ((23.912143528942327 32.23638576333265, 62.9449272526509 65.94496225071073, 39.57411814697713 45.06330482854103, 23.912143528942327 32.23638576333265))";

  const wktData =
    "POLYGON ((23.912143528942327 32.23638576333265, 62.9449272526509 65.94496225071073, 39.57411814697713 45.06330482854103, 23.912143528942327 32.23638576333265))";

  const geojson = wkx(wktData);
  console.log(geojson.coordinates);
  return (
    <div className="">
      <h1>Hello World</h1>

      <div className="border-2 border-red-600">
        <MapContainer
          center={geojson.coordinates[0][0]}
          zoom={10}
          style={{ height: "40%", width: "40%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* <Polygon positions={geojson.coordinates} /> */}
          {geojson.coordinates.map((polygon, index) => (
            <Polygon key={index} positions={polygon} />
          ))}
          {/* <Polygon positions={geojson.coordinates[0]} /> */}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapOutput;
