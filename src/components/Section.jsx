import { Repo } from "./Repo";
import data from "../data.json";
import { cn } from "../lib/cls.js";
import { useState } from "react";
import { Button } from "./Button";

const ORDER = {
  desc: -1,
  asc: 1,
};

export function Section(props) {
  const [entries, setEntries] = useState(props.entries);
  const [sortStarsOrder, setSortStarsOrder] = useState(ORDER.desc);
  const [sortDateOrder, setSortDateOrder] = useState(ORDER.desc);

  function sortEntriesByStars() {
    const sortedEntries = [...entries];
    sortedEntries.sort((a, b) => {
      const aData = data.repoData[a.url];
      const bData = data.repoData[b.url];

      if (aData.stars === bData.stars) return 0;
      if (aData.stars > bData.stars) return sortStarsOrder;
      return sortStarsOrder * -1;
    });
    setEntries(sortedEntries);
    setSortStarsOrder((order) =>
      order === ORDER.desc ? ORDER.asc : ORDER.desc,
    );
  }

  function sortEntriesByUpdateTime() {
    const sortedEntries = [...entries];
    sortedEntries.sort((a, b) => {
      const aUpdateAt = new Date(data.repoData[a.url].updated_at);
      const bUpdateAt = new Date(data.repoData[b.url].updated_at);

      if (aUpdateAt === bUpdateAt) return 0;
      if (aUpdateAt > bUpdateAt) return sortDateOrder;
      return sortDateOrder * -1;
    });
    setEntries(sortedEntries);
    setSortDateOrder((order) =>
      order === ORDER.desc ? ORDER.asc : ORDER.desc,
    );
  }

  return (
    <>
      <section className="my-12" id={props.title}>
        <div className="flex justify-between items-center gap-y-2 px-4 py-4 flex-col sm:flex-row sticky top-0 bg-white/95 border-b">
          <div />
          <h3
            className={cn(
              "scroll-m-20 font-semibold tracking-tight text-center",
              props.parent ? "text-xl lg:text-2xl" : "text-2xl lg:text-3xl",
            )}
          >
            {props.parent && props.parent + " - "}
            {props.title}
          </h3>
          <div className="flex gap-x-2 items-center">
            <Button
              onClick={sortEntriesByStars}
              className={cn("whitespace-nowrap", {
                hidden: !props.entries.length,
              })}
            >
              Sort by stars
            </Button>
            <Button
              onClick={sortEntriesByUpdateTime}
              className={cn("whitespace-nowrap", {
                hidden: !props.entries.length,
              })}
            >
              Sort by update
            </Button>
          </div>
        </div>
        <ul className="space-y-2 sm:mx-4">
          {entries.map((e) => (
            <Repo {...data.repoData[e.url]} key={e.url} />
          ))}
        </ul>
      </section>
      {props.children.map((c) => (
        <Section {...c} parent={props.parent ?? props.title} key={c.title} />
      ))}
    </>
  );
}
