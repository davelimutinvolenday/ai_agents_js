"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isMouseInactive, setIsMouseInactive] = useState(false);
  const [isKeyboardInactive, setIsKeyboardInactive] = useState(false);
  const [loading, setLoading] = useState(false);

  const maxWidth = 600;

  useEffect(() => {
    let timer;
    const inactivityTimeout = 2000; // 2 seconds of inactivity

    const resetMouseTimer = () => {
      setIsMouseInactive(false);
      setIsKeyboardInactive(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsMouseInactive(true);
        setIsKeyboardInactive(true);
      }, inactivityTimeout);
    };

    const resetKeyboardTimer = () => {
      setIsKeyboardInactive(false);
      setIsMouseInactive(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsKeyboardInactive(true);
        setIsMouseInactive(true);
      }, inactivityTimeout);
    };

    window.addEventListener("mousemove", resetMouseTimer);
    window.addEventListener("keydown", resetKeyboardTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetMouseTimer);
      window.removeEventListener("keydown", resetKeyboardTimer);
    };
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/agent", { question: input });
      console.log("::::res", res);
      setResponse(res.data);
    } catch (error) {
      console.error("Error calling API:", error);
      setResponse("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto"; // Reset height to auto for proper resizing
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust the height based on the scrollHeight
  };

  const letterT = (
    <span style={{ color: isMouseInactive || isKeyboardInactive ? "#FF6000" : "black", transition: ".3s" }}>
      t
    </span>
  );
  const letterO = (
    <span style={{ color: isMouseInactive || isKeyboardInactive ? "#B43F3F" : "black", transition: ".9s" }}>
      o
    </span>
  );
  const letterD = (
    <span style={{ color: isMouseInactive || isKeyboardInactive ? "#379777" : "black", transition: "1.5s" }}>
      d
    </span>
  );
  const letterA = (
    <span style={{ color: isMouseInactive || isKeyboardInactive ? "#6554AF" : "black", transition: "2.1s" }}>
      a
    </span>
  );
  const letterY = (
    <span style={{ color: isMouseInactive || isKeyboardInactive ? "#C07F00" : "black", transition: "2.7s" }}>
      y
    </span>
  );

  const Skeleton = () => (
    <div className="flex flex-col gap-4 animate-pulse" style={{width: maxWidth}}>
      <div className="h-8 bg-gray-300 rounded w-3/4"></div>
      <div className="h-20 bg-gray-300 rounded"></div>
      <div className="h-8 bg-gray-300 rounded w-1/2"></div>
    </div>
  );

  return (
    <div id="main-container" className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main id="main" className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <section id="section-hero-banner">
          <h1 style={{ fontSize: "2em" }}>
            Hello, how can I help you {letterT}
            {letterO}
            {letterD}
            {letterA}
            {letterY}
            <span id="question-mark" style={{ animationDuration: isMouseInactive || isKeyboardInactive ? "4s" : "0s", transition: "1.1s" }}>
              ?
            </span>
          </h1>
        </section>
        <section id="section-ai">
          <textarea
            style={{
              width: maxWidth - 100,
              maxHeight: 300,
            }}
            alt="input"
            placeholder="Ask me anything"
            value={input}
            onChange={handleInputChange}
            wrap="hard"
          />
          <div id="send-container" onClick={handleSubmit}>
            <p
              style={{
                transform: "scale(1.7)",
                backgroundColor: "green",
                height: 0,
                marginTop: -40,
              }}
            >
              {`>`}
            </p>
          </div>
        </section>
        {loading ? (
          <Skeleton />
        ) : (
          <div id="reponse-container" style={{maxWidth}}>{response}</div>
        )}
        {/* <Skeleton /> */}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
