import { useState } from "react";
import GeneratorForm from "./GeneratorForm";
import MapOutput from "./MapOutput";

export default function GeneratorDashboard() {
  const [data, setData] = useState(null);

  return (
    <div className="w-full min-h-screen">
      <div className="grid grid-cols-2">
        <GeneratorForm setData={setData} data={data} />
        <MapOutput data={data} />
      </div>
    </div>
  );
}
