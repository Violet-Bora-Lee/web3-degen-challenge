import { useEffect, useState } from "react";
import Switch from "react-switch";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import router from "next/router";

import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(true);
  
  useEffect(() => {
    const body = document.querySelector("body");
    darkMode ? body.classList.add("dark") : body.classList.remove("dark");
  }, [darkMode]);
  
  const files = [
    {
      source:
        'challenge0.png',
      id: 0,
    },
    {
      source:
        'challenge1.png',
      id: 1,
    },
    {
      source:
        'challenge2.png',
      id: 2,
    },
  ]
  
  return (
    <div className="container mx-auto px-4 flex flex-col min-h-screen">
      <header className="py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-dark-yellow">
            WEB3 DEGEN CHALLENGE
          </h1>
          <div className="hidden">
            <Switch
              onChange={setDarkMode}
              checked={darkMode}
              onColor="#4F46E5"
              offColor="#D1D5DB"
              uncheckedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 15,
                    color: "#FFF",
                    paddingRight: 2
                  }}
                >
                  ☀️
                </div>
              }
              checkedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 15,
                    color: "#FFF",
                    paddingRight: 2
                  }}
                >
                  🌙
                </div>
              }
              className="react-switch"
            />
          </div>
          <ConnectButton />
        </div>
      </header>
      
      <main>
        <div
          class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20
           lg:pt-32">
          <h1
            class="max-w-2xl font-display text-2xl font-medium tracking-tight
             text-slate-900 sm:text-4xl text-dark-yellow">
            Ongoing Challenges
          </h1>
          <div class="mt-10 flex justify-center gap-x-6">
            <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {files.map((file) => (
                <li key={file.source} className="relative" onClick={() => router.push(`challenge${file.id}`)}>
                  <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg">
                    <img src={file.source} alt="" className="pointer-events-none object-cover" />
                    <button type="button" className="absolute inset-0 focus:outline-none">
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      
      </main>
    
    </div>
  );
}
