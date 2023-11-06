import { useState } from "react";
import GeneratorForm from "./GeneratorForm";
// import MapOutput from "./MapOutput";
import PolygonCanvas from "./PolygonCanvas";

const initObj = {
  cardinality: 3,
  xsize: 500,
  ysize: 500,
  minvertices: 3,
  maxvertices: 3,
  irregularity: 0,
  spikiness: 0,
};

export default function GeneratorDashboard() {
  const [data, setData] = useState(null);
  const [requestData, setRequestData] = useState(initObj);
  return (
    <div className="w-full min-h-screen">
      <div className="grid grid-cols-2">
        <GeneratorForm
          setData={setData}
          data={data}
          requestData={requestData}
          setRequestData={setRequestData}
        />
        <PolygonCanvas
          dimensions={{
            width: requestData.xsize,
            height: requestData.ysize,
          }}
          polygons={data}
        />
      </div>
    </div>
  );
}
