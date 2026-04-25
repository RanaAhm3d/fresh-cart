export default function Loading({ text }: { text: string }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center">
          <svg
            data-prefix="fas"
            data-icon="spinner"
            className={`svg-inline--fa fa-spinner size-9 text-${text === "brands" ? "violet" : "primary"}-600 animate-spin mb-4`}
            role="img"
            viewBox="0 0 512 512"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M208 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm0 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM48 208a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm368 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM75 369.1A48 48 0 1 1 142.9 437 48 48 0 1 1 75 369.1zM75 75A48 48 0 1 1 142.9 142.9 48 48 0 1 1 75 75zM437 369.1A48 48 0 1 1 369.1 437 48 48 0 1 1 437 369.1z"
            ></path>
          </svg>
          <p className="text-gray-500">Loading {text}...</p>
        </div>
      </div>
    </div>
  );
}
