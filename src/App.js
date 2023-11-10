import GeneratorDashboard from "./components/generator-dashboard";
import { useState } from "react";
import PointVor from "./components/generator-point-vor";
import PointHull from "./components/generator-point-hull";
function App() {
  const [algorithm, setAlgorithm] = useState("poly");
  const handleChange = (e) => {
    setAlgorithm(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div className="flex">
      <div>
        <div className="bg-slate-100 min-h-screen">
          {/* <h1 className="text-xl"></h1> */}

          <select onChange={handleChange} className="mt-10">
            <option value={"poly"}>Polygon Generation</option>
            <option value={"point_vor"}>Point Generation - Voronoi</option>
            <option value={"point_hull"}>Point Generation - Convex Hull</option>
          </select>
        </div>
      </div>

      <div className="text-4xl ">
        {algorithm === "poly" && <GeneratorDashboard />}
        {algorithm === "point_vor" && <PointVor />}
        {algorithm === "point_hull" && <PointHull />}
      </div>
    </div>
  );
}

export default App;
