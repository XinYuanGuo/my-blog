import { renderCanvas } from "@/utils/renderCanvas";
import { useEffect, useRef } from "react";

const HomeHero = () => {
  const ref = useRef<HTMLHeadingElement>(null);
  const welcome = "The bonds of people is true power";
  useEffect(() => {
    renderCanvas();
    if (ref.current) {
      const children = Array.from(ref.current.children);
      children.forEach((c) => {
        c.classList.remove("opacity-0");
      });
    }
  }, []);
  return (
    <div>
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0"
        id="canvas"
      ></canvas>
      <div className="relative z-10 flex h-[calc(100vh_-_100px)] items-center justify-center">
        <div
          ref={ref}
          className="px-4 text-3xl text-black dark:text-white md:text-4xl"
        >
          {welcome.split("").map((latter, index) => (
            <span
              style={{ transitionDelay: 0.2 * (index + 1) + "s" }}
              className="opacity-0 transition-opacity"
              key={index}
            >
              {latter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
