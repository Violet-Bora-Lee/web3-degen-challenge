import { useEffect, useState } from "react";
import Switch from "react-switch";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import router from "next/router";

import "react-toastify/dist/ReactToastify.css";

import { RadioGroup, Listbox } from "@headlessui/react";

const plans = [
  {
    name: "Hobby",
    price: "$40"
  },
  {
    name: "Startup",
    price: "$80"
  },
  {
    name: "Business",
    price: "$160"
  },
  {
    name: "Enterprise",
    price: "$240"
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Spinner = () => (
  <svg
    className="animate-spin -ml-1 h-5 w-5 text-gray-500"
    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
      strokeWidth="4"></circle>
    <path
      className="opacity-75" fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const CheckedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#34D399"/> {/* 초록색 원 */}
    <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> {/* 브이자 */}
  </svg>
);


export default function Challenge1() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [loadingPlan, setLoadingPlan] = useState(null);
  
  const togglePlan = (planName) => {
    if (selectedPlans.includes(planName)) return;
    // 클릭된 plan의 로딩 상태 설정
    setLoadingPlan(planName);
    
    setTimeout(() => {
      // 실제 plan 토글 작업 수행
      setSelectedPlans(prev => {
        if (prev.includes(planName)) {
          return prev.filter(p => p !== planName);
        } else {
          return [...prev, planName];
        }
      });
      
      // 로딩 상태 초기화
      setLoadingPlan(null);
    }, 1000);
  };
  
  useEffect(() => {
    const body = document.querySelector("body");
    darkMode ? body.classList.add("dark") : body.classList.remove("dark");
  }, [darkMode]);
  
  const files = [
    {
      source:
        "linea-challenge.png"
    },
    {
      source:
        "optimism-challenge.png"
    },
    {
      source:
        "taiko-challenge.png"
    }
  ];
  
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
          className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          {/*상단*/}
          <section className="mt-16">
            <div
              className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg">
              <img src="/linear-challenge-details.png" alt=""
                   className="pointer-events-none object-cover" />
            </div>
          </section>
          {/*하단*/}
          <section className="mt-16 mb-40">
            <Listbox as="div" className="space-y-4">
              {plans.map((plan) => (
                <Listbox.Option
                  key={plan.name}
                  onClick={() => togglePlan(plan.name)}
                  className={classNames(
                    selectedPlans.includes(plan.name) ?
                      "border-indigo-600 ring-2 ring-indigo-600" :
                      "border-gray-300",
                    "relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
                  )}
                >
            <span className="flex items-center w-full">
              <span className="flex flex-row justify-between text-sm w-full">
                <Listbox.Label as="span" className="font-medium">
                  {plan.name}
                </Listbox.Label>
                {loadingPlan === plan.name ? (
                  <span className="text-gray-500">
                    <Spinner />
                  </span>
                ) : selectedPlans.includes(plan.name) ? (
                  <span className="text-green-500 dark:text-green-500!">
                    <CheckedIcon />
                  </span>
                ) : (
                  <span className="text-gray-500">
                    Check Availability
                  </span>
                )}
              </span>
            </span>
                  <span
                    className={classNames(
                      selectedPlans.includes(plan.name) ? "border" : "border-2",
                      "border-indigo-600",
                      "pointer-events-none absolute -inset-px rounded-lg"
                    )}
                    aria-hidden="true"
                  />
                </Listbox.Option>
              ))}
            </Listbox>
          </section>
        </div>
      </main>
    </div>
  )
    ;
}
