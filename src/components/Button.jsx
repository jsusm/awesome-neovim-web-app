export function Button(props) {
  return (
    <button
      className="border border-gray-300 text-sm px-3 py-1 rounded-md bg-gradient-to-t from-gray-50 active:bg-gradient-to-b active:from-gray-100"
      {...props}
    >
      {props.children}
    </button>
  )
}
