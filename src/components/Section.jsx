import { Repo } from "./Repo";
import data from "../data.json";
import clsx from "clsx";

export function Section(props) {
  return (
    <section className="mt-12">
      <h3
        className={clsx(
          "scroll-m-20 font-semibold tracking-tight mb-4 px-4 text-center",
          props.parent ? "text-xl lg:text-2xl" : "text-2xl lg:text-3xl",
        )}
      >
        {props.parent && props.parent + " - "}
        {props.title}
      </h3>
      <ul className="mx-4 space-y-2">
        {props.entries.map((e) => (
          <Repo {...data.repoData[e.url]} key={e.url} />
        ))}
      </ul>
      {props.children.map((c) => (
        <Section {...c} parent={props.parent ?? props.title} key={c.title} />
      ))}
    </section>
  );
}
