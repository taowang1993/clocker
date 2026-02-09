import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <div>
      <div
        className="flex flex-row items-center justify-end px-2 py-1 pl-20"
        style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
      >
        <div className="flex items-center gap-2" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
