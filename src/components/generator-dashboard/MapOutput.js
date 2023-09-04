import React from "react";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapOutput = ({ data: coordinates }) => {
  console.log(coordinates);
  // data is an array of polygons like:
  //   const wktData =
  // "POLYGON ((23.912143528942327 32.23638576333265, 62.9449272526509 65.94496225071073, 39.57411814697713 45.06330482854103, 23.912143528942327 32.23638576333265))";
  return (
    <div className="col-span-1">
      MapOutput
      {coordinates && (
        <MapContainer
          center={coordinates[0][0]}
          zoom={10}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {coordinates.map((polygon, index) => {
            return <Polygon key={index} positions={polygon} />;
          })}
        </MapContainer>
      )}
    </div>
  );
};

export default MapOutput;
