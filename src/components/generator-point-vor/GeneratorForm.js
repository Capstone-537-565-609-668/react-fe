import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import useHistory from "../../hooks/useHistory";
const GeneratorForm = ({ setData, data, requestData, setRequestData }) => {
  const [loading, setLoading] = useState(false);

  const [uuid, setUuid] = useState(null);
  const { history, addToHistory } = useHistory("point-gen-voronoi");
  const handleChange = (e) => {
    setRequestData({ ...requestData, [e.target.name]: e.target.value });
  };
  const handleClickRecord = (event, item) => {
    event.preventDefault();
    setRequestData(item);
    setUuid(item.dataset_id);

    fetch(`http://localhost:5000/get_visualization/${uuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/zip",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        let temp = JSON.parse(res.for_visualizer);
        console.log(
          JSON.stringify(
            temp.features.map((item) => item.geometry.coordinates[0])
          )
        );
        setData(temp.features.map((item) => item.geometry.coordinates[0]));
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error => ", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(requestData);

    setLoading(true);

    fetch("http://localhost:5000/generate_points_voronoi/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardinality: requestData.cardinality,
        xsize: requestData.xsize,
        ysize: requestData.ysize,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUuid(res.dataset_id);
        let temp = JSON.parse(res.for_visualizer);
        console.log(
          JSON.stringify(
            temp.features.map((item) => item.geometry.coordinates[0])
          )
        );
        setData(temp.features.map((item) => item.geometry.coordinates[0]));
        setLoading(false);
        addToHistory({ ...requestData, dataset_id: res.dataset_id });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleDownload = (e, ext) => {
    e.preventDefault();

    //return type is a zip file and make sure to download the zip file

    fetch(`http://localhost:5000/get_file/${uuid}/${ext}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/zip",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("Hereee");
          return res.blob();
        }
        alert("Something went wrong");
      })
      .then((blob) => {
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${uuid}.${ext}`;
        a.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading zip file:", error);
      });
  };
  return (
    <div className="pl-3">
      <div>
        <h2>
          <span className="text-2xl font-bold">Generator Point Voronoi</span>
        </h2>
        <div className="flex flex-col p-4 gap-8">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="cardinality"
          >
            Cardinality
            <input
              type="number"
              name="cardinality"
              id="cardinality"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min={1}
              max={1000}
              onChange={handleChange}
              value={requestData.cardinality}
            />
          </label>
          <div className="flex w-full gap-4 items-center">
            <label
              className="text-gray-700 text-sm font-bold mb-2 flex-1"
              htmlFor="xsize"
            >
              xsize
              <input
                type="number"
                name="xsize"
                id="xsize"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                min={500}
                step={50}
                onChange={handleChange}
                value={requestData.xsize}
              />
            </label>
            <label
              className="text-gray-700 text-sm font-bold mb-2 flex-1"
              htmlFor="ysize"
            >
              ysize
              <input
                type="number"
                name="ysize"
                id="ysize"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                min={500}
                step={50}
                onChange={handleChange}
                value={requestData.ysize}
              />
            </label>
          </div>
          <div className="flex gap-4 ">
            <div>
              <button
                onClick={handleSubmit}
                className="bg-black text-white flex rounded-md px-4 py-2 text-sm hover:bg-slate-400 disabled:bg-slate-400 disabled:text-black"
                disabled={loading}
              >
                {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                Generate
              </button>
            </div>
            {data && (
              <div className="flex flex-wrap gap-6">
                <button
                  onClick={(event) => handleDownload(event, "csv")}
                  className="bg-green-700 text-white flex rounded-md px-4 py-2 text-sm hover:bg-green-400 disabled:bg-green-400 disabled:text-white"
                >
                  Download CSV
                </button>
                <button
                  onClick={(event) => handleDownload(event, "shp")}
                  className="bg-green-700 text-white flex rounded-md px-4 py-2 text-sm hover:bg-green-400 disabled:bg-green-400 disabled:text-white"
                >
                  Download SHP
                </button>

                <button
                  onClick={(event) => handleDownload(event, "wkt")}
                  className="bg-green-700 text-white flex rounded-md px-4 py-2 text-sm hover:bg-green-400 disabled:bg-green-400 disabled:text-white"
                >
                  Download WKT
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-slate-100 rounded-md p-4" key={history}>
        <h3>
          <span className="text-2xl font-bold">Generation History</span>
        </h3>
        {history.reverse()?.map((item) => (
          <div
            className="flex gap-4 text-sm cursor-pointer bg-white p-4 rounded-sm my-2"
            onClick={(event) => handleClickRecord(event, item)}
            key={item?.dataset_id}
          >
            <p>
              <span>Cardinality:</span>
              {item.cardinality}
            </p>
            <p>
              <span>Xsize:</span>
              {item.xsize}
            </p>
            <p>
              <span>Ysize:</span>
              {item.ysize}
            </p>
            {/* <p>
              <span>Min Vertices:</span>
              {item.minvertices}
            </p>
            <p>
              <span>Max Vertices:</span>
              {item.maxvertices}
            </p>
            <p>
              <span>Irregularity:</span>
              {item.irregularity}
            </p>
            <p>
              <span>Spikiness:</span>
              {item.spikiness}
            </p> */}
          </div>
        ))}
        {!history?.length && <p className="text-lg">No Render History</p>}
      </div>
    </div>
  );
};

export default GeneratorForm;
