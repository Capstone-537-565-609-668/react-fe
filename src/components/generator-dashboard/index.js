import GeneratorForm from "./GeneratorForm";
import MapOutput from "./MapOutput";

export default function GeneratorDashboard() {
  return (
    <div className="w-full min-h-screen">
      <div className="grid grid-cols-2">
        <GeneratorForm />
        <MapOutput />
      </div>
    </div>
  );
}
