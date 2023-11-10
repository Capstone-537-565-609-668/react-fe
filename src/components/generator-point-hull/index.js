import { useState } from "react";
import GeneratorForm from "./GeneratorForm";
import PolygonCanvas from "./PolygonCanvas";
const initObj = {
  cardinality: 10,
  xsize: 500,
  ysize: 500,
};

export default function GeneratorDashboard() {
  const [data, setData] = useState(null);
  const [requestData, setRequestData] = useState(initObj);
  return (
    <div className="w-full h-screen">
      <div className="grid grid-cols-2 overflow-hidden">
        <GeneratorForm
          setData={setData}
          data={data}
          requestData={requestData}
          setRequestData={setRequestData}
        />
        <div className="overflow-auto">
          <PolygonCanvas
            dimensions={{
              width: requestData.xsize,
              height: requestData.ysize,
            }}
            polygons={data}
          />
        </div>
      </div>
    </div>
  );
}
