import { useEffect, useState } from "react";
import Switch from "react-switch";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import router from "next/router";

import "react-toastify/dist/ReactToastify.css";

export default function Challenge1() {
  const [darkMode, setDarkMode] = useState(true);
  
  useEffect(() => {
    const body = document.querySelector("body");
    darkMode ? body.classList.add("dark") : body.classList.remove("dark");
  }, [darkMode]);
  
  const files = [
    {
      source:
        'linea-challenge.png',
    },
    {
      source:
        'optimism-challenge.png',
    },
    {
      source:
        'taiko-challenge.png',
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
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <section className="mt-16">
            <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg">
              <img src="/linear-challenge-details.png" alt="" className="pointer-events-none object-cover" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
