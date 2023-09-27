import { formatDistance } from "date-fns";
import { Star, HeartCrack } from "lucide-react";

export function Repo(props) {
  return (
    <li>
      <a
        className="px-4 py-2 rounded-md border border-transparent group hover:border-gray-300 transition-all block hover:bg-gradient-to-b hover:from-gray-100"
        href={props.url}
        target="_blank"
      >
        <div className="flex justify-between gap-4">
          <div className="flex items-center gap-x-4 flex-wrap grow">
            <p className="text-base font-semibold transition-all lg:text-lg group-hover:text-blue-600">
              {props.full_name}
            </p>
            {props.description ? (
              <p className="text-sm">{props.description}</p>
            ) : (
              <p className="text-sm">{props.desc}</p>
            )}
          </div>
          <div className="self-center flex gap-x-4 gap-y-1 flex-wrap flex-col items-end md:justify-end md:flex-row md:items-center">
            {props.archived && (
              <p className="font-medium text-red-600 flex items-center gap-1 text-xs sm:text-sm">
                Archived
                <HeartCrack size="18" className="inline" />
              </p>
            )}
            {props.updated_at && (
              <p className="font-medium whitespace-nowrap text-xs sm:text-sm">
                {formatDistance(new Date(props.updated_at), new Date())} ago.
              </p>
            )}
            {props.stars && (
              <p className="flex items-center gap-1 font-medium text-xs sm:text-sm">
                {props.stars}
                <Star size="18" className="inline" />
              </p>
            )}
          </div>
        </div>
      </a>
    </li>
  );
}
