import { useKBar } from "kbar";

export default function CommandPaletteToggle() {
  const { query } = useKBar();

  return (
    <button
      aria-label="Toggle Command Palette"
      type="button"
      className="hidden h-12 w-12 rounded py-3 px-4 transition-colors hover:bg-gray-100/60 dark:hover:bg-gray-800/60 sm:block"
      onClick={query.toggle}
    >
      <svg
        fill="none"
        className="h-4 w-4 transition-colors"
        viewBox="0 0 18 18"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M14.333 1a2.667 2.667 0 0 0-2.666 2.667v10.666a2.667 2.667 0 1 0 2.666-2.666H3.667a2.667 2.667 0 1 0 2.666 2.666V3.667a2.667 2.667 0 1 0-2.666 2.666h10.666a2.667 2.667 0 0 0 0-5.333Z"
        />
      </svg>
    </button>
  );
}
