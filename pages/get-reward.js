import { useEffect, useState, Fragment } from "react";
import Switch from "react-switch";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import router from "next/router";

import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const supportedMainnet = [
  { id: 1, name: "Ethereum" },
  { id: 2, name: "Linea" },
  { id: 3, name: "Polygon" },
  { id: 4, name: "Optimism" }
];

export default function GetReward() {
  const [darkMode, setDarkMode] = useState(true);
  const [selected, setSelected] = useState(supportedMainnet[0])
  
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
            class="mx-auto max-w-4xl font-display text-xl font-medium tracking-tight
             sm:text-4xl mb-5">
            Choose Network and Token to get the Reward
          </h1>
          <span
            class="mx-auto max-w-4xl font-display text-2xl font-medium tracking-tight
             sm:text-6xl text-dark-yellow mb-10 mr-3">
            0.04
          </span>
          <span
            class="mx-auto max-w-4xl font-display text-2xl font-medium tracking-tight
             sm:text-2xl text-dark-yellow mb-10">
            ETH
          </span>
          <div class="mt-10 flex flex-col justify-center gap-x-6">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col w-1/2">
                <div className="w-full flex flex-row mb-10">
                  <label
                    htmlFor="countries"
                    className="flex-1 block text-gray-900 dark:text-gray-900 flex-1
                    mr-5 justify-center items-center w-full text-center">
                    Network
                    </label>
                  <select
                    id="countries"
                    className="flex-3 bg-gray-800 border border-gray-300 text-gray-900! text-sm rounded-lg w-full block w-full p-2.5">
                    <option selected>Choose a network</option>
                    <option value="ETH">Ethereum</option>
                    <option value="axlUSDC">Linea</option>
                    <option value="MATIC">Polygon</option>
                  </select>
                </div>
              </div>

            </div>
            <Link
              className="group inline-flex items-center justify-center rounded-full
               py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-dark-yellow hover:text-slate-100 active:bg-slate-800 active:text-slate-300
                focus-visible:outline-slate-900 w-40 mx-auto mt-20"
              href="#">Claim</Link>
          </div>
        </div>
      
      </main>
    
    </div>
  );
}
