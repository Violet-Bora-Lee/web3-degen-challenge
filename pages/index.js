import { useEffect, useState } from "react";
import Switch from "react-switch";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  
  useEffect(() => {
    const body = document.querySelector("body");
    darkMode ? body.classList.add("dark") : body.classList.remove("dark");
  }, [darkMode]);
  
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
          class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center
           lg:pt-32">
          <h1
            class="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight
             text-dark-yellow sm:text-7xl">
            Make a habit to explore Web3 ecosystem together
          </h1>
          <div class="mt-10 flex justify-center gap-x-6">
            <a
              className="group inline-flex items-center justify-center rounded-full
               py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-dark-yellow hover:text-slate-100 active:bg-slate-800 active:text-slate-300
                focus-visible:outline-slate-900"
              href="/dashboard">Start To Be A Web3 Degen</a>
          </div>
        </div>
      
      </main>
    
    </div>
  );
}
