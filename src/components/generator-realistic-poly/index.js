import { useState } from "react";
import GeneratorForm from "./GeneratorForm";
import MapOutput from "./MapOutput";
const initObj = {
  cardinality: 10,
  xsize: 500,
  ysize: 500,
  type: "parks",
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
        <div className="overflow-auto" key={data}>
          <MapOutput
            // dimensions={{
            // width: requestData.xsize,
            // height: requestData.ysize,
            // }}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}
