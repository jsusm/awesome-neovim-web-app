import { formatDistance } from "date-fns";
import { Star, HeartCrack } from "lucide-react";

export function Repo(props) {
  return (
    <li>
      <a
        className="px-4 py-2 border border-transparent group hover:border-gray-300 transition-all block sm:rounded-md hover:bg-gradient-to-b hover:from-gray-100"
        href={props.url}
        target="_blank"
      >
        <div className="sm:flex justify-between gap-4 space-y-1 sm:space-y-0">
          <div className="flex sm:items-center gap-x-4 flex-wrap flex-col sm:flex-row">
            <p className="text-base font-semibold transition-all lg:text-lg group-hover:text-blue-600">
              {props.full_name}
            </p>
            {props.description ? (
              <p className="text-sm">{props.description}</p>
            ) : (
              <p className="text-sm">{props.desc}</p>
            )}
          </div>
          <div className="self-center flex gap-x-4 gap-y-1 flex-wrap justify-end md:items-center lg:text-sm text-xs font-medium text-gray-800">
            {props.archived && (
              <p className="text-red-600 flex items-center gap-1">
                Archived
                <HeartCrack size="18" className="inline" />
              </p>
            )}
            {props.updated_at && (
              <p className="whitespace-nowrap">
                {formatDistance(new Date(props.updated_at), new Date())} ago.
              </p>
            )}
            {props.stars && (
              <p className="flex items-center gap-1">
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
