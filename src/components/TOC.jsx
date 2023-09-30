import data from "../data.json";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import { useState } from "react";
import { cn } from "../lib/cls";
import { Menu } from 'lucide-react'

function Content(props) {
  return (
    <>
      <a
        href={`#${props.title}`}
        className="hover:text-blue-600 hover:underline block dark:hover:text-blue-400"
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
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <>
      <Button 
        onClick={() => setOpen(!open)}
        className="px-0 py-0 w-8 h-8 flex justify-center items-center text-gray-800 dark:text-gray-200"
      >
        <Menu size={20} />
      </Button>
      {createPortal(
        <div
          className="absolute top-0 bottom-0 left-0"
        >
          <div
            className={cn(
              "fixed w-screen h-screen pointer-events-none hidden bg-transparent",
              { "bg-gray-600/50 block pointer-events-auto dark:bg-gray-950/50": open },
            )}
            onClick={close}
          />
          <div
            className={cn(
              "fixed top-0 left-0 bottom-0 transition-all overflow-y-scroll overflow-x-hidden shadow-xl max-w-[300px]",
              { "-translate-x-full": !open },
            )}
          >
            <div className="px-8 py-8 bg-white dark:bg-gray-900 dark:text-gray-200">
              <p className="text-2xl font-semibold tracking-tight">
                Table of Content
              </p>
              <div className="py-4">
                <Button onClick={close}>Close</Button>
              </div>
              {data.sections.children.map((s) => (
                <div className="pb-2">
                  <Content {...s} onClick={close} />
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body,
      )
      }
    </>
  )
}
