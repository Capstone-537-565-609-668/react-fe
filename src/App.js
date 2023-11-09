import GeneratorDashboard from "./components/generator-dashboard";
import { useState } from "react";
import PointVor from "./components/generator-point-vor";
import PointHull from "./components/generator-point-hull";
import RealisticPoly from "./components/generator-realistic-poly";
function App() {
  const [algorithm, setAlgorithm] = useState("poly");
  const [area, setArea] = useState("parks");
  const handleChange_gen = (e) => {
    setAlgorithm(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="flex">
      <div>
        <div className="bg-slate-100 min-h-screen">
          {/* <h1 className="text-xl"></h1> */}

          <select onChange={handleChange_gen} className="mt-10">
            <option value={"poly"}>Polygon Generation</option>
            <option value={"point_vor"}>Point Generation - Voronoi</option>
            <option value={"point_hull"}>Point Generation - Convex Hull</option>
            <option value={"realistic_poly"}>
              Realistic Polygon Generation
            </option>
          </select>
        </div>
      </div>

      <div className="text-4xl ">
        {algorithm === "poly" && <GeneratorDashboard />}
        {algorithm === "point_vor" && <PointVor />}
        {algorithm === "point_hull" && <PointHull />}
        {algorithm === "realistic_poly" && <RealisticPoly />}
      </div>
    </div>
  );
}

export default App;
