import React from "react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
const GeneratorForm = ({ setData, data, requestData, setRequestData }) => {
  const [loading, setLoading] = useState(false);

  const [uuid, setUuid] = useState(null);

  const handleChange = (e) => {
    setRequestData({ ...requestData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(requestData);

    setLoading(true);

    fetch("http://localhost:5000/realistic_polygon/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardinality: requestData.cardinality,
        xsize: requestData.xsize,
        ysize: requestData.ysize,
        type: requestData.type,
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
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleDownload = (e) => {
    e.preventDefault();

    //return type is a zip file and make sure to download the zip file

    fetch(`http://localhost:5000/get_file/${uuid}`, {
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
        a.download = `${uuid}.zip`;
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
          <span className="text-2xl font-bold">
            Realistic Polygon Generation
          </span>
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

          <div className="flex w-full gap-4 items-center">
            <label
              className="text-gray-700 text-sm font-bold mb-2 flex-1"
              htmlFor="minvertices"
            >
              Type
              <select
                onChange={handleChange}
                name="type"
                className="block shadow-lg border rounded w-full py-2"
              >
                <option value="parks">Parks</option>
                <option value="lakes">Lakes</option>
                <option value="sport">Sports</option>
              </select>
            </label>
          </div>
          <div className="flex gap-4 ">
            <button
              onClick={handleSubmit}
              className="bg-black text-white flex rounded-md px-4 py-2 text-sm hover:bg-slate-400 disabled:bg-slate-400 disabled:text-black"
              disabled={loading}
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              Generate
            </button>
            {data && (
              <button
                onClick={handleDownload}
                className="bg-green-700 text-white flex rounded-md px-4 py-2 text-sm hover:bg-green-400 disabled:bg-green-400 disabled:text-white"
              >
                Download CSV
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorForm;