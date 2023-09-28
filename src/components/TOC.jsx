import data from "../data.json";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import { useState } from "react";
import { cn } from "../lib/cls";

function Content(props) {
  return (
    <>
      <a
        href={`#${props.title}`}
        className="hover:text-blue-600 hover:underline block"
        onClick={() => props.onClick()}
      >
        {props.title}
      </a>
      {props.children.length !== 0 && (
        <ul className="px-4">
          {props.children.map((c) => (
            <li key={c.title}>
              <Content {...c} onClick={props.onClick} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function TableOfContent() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative my-8">
      <Button className="ml-64" onClick={() => setOpen(!open)}>
        Open table of content
      </Button>
      {createPortal(
        <div
          className="absolute top-0 bottom-0 left-0"
        >
          <div
            className={cn(
              "fixed w-screen h-screen transition-all pointer-events-none hidden bg-transparent",
              { "bg-gray-600/50 block pointer-events-auto": open },
            )}
            onClick={() => setOpen(false)}
          />
          <div
            className={cn(
              "fixed top-0 left-0 bottom-0 transition-all overflow-y-scroll overflow-x-hidden shadow-xl max-w-[300px]",
              { "-translate-x-full": !open },
            )}
          >
            <div className="px-8 py-8 bg-white">
              <p className="text-2xl font-semibold tracking-tight">
                Table of Content
              </p>
              <div className="py-4">
                <Button onClick={() => setOpen(false)}>Close</Button>
              </div>
              {data.sections.children.map((s) => (
                <div className="pb-2">
                  <Content {...s} onClick={() => setOpen(false)} />
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
