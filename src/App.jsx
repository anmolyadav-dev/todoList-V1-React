import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Card from "./components/Card";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex w-full justify-center items-start h-full py-[10rem]  overflow-x-hidden">
      <Card />
    </div>
  );
}

export default App;
