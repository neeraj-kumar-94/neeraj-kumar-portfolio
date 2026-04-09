import { Fragment, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const ringSpring = { stiffness: 120, damping: 24, mass: 0.42 };
const dotSpring = { stiffness: 500, damping: 36 };

function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, ringSpring);
  const ringY = useSpring(mouseY, ringSpring);
  const dotX = useSpring(mouseX, dotSpring);
  const dotY = useSpring(mouseY, dotSpring);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return undefined;

    const handleMove = (event) => {
      setIsVisible(true);
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      const target = event.target;
      if (target instanceof Element) {
        const interactive = target.closest(
          "a, button, input, textarea, select, [role='button'], label[for], .cursor-pointer"
        );
        setIsHovering(Boolean(interactive));
      }
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [mouseX, mouseY]);

  const blendMode = isHovering ? "normal" : "difference";

  return (
    <Fragment>
      <motion.div
        aria-hidden
        className="nk-cursor-layer pointer-events-none fixed left-0 top-0 z-[10051] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: blendMode,
        }}
        animate={{
          width: isHovering ? 54 : 42,
          height: isHovering ? 54 : 42,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
      >
        <div
          className={`flex h-full w-full items-center justify-center rounded-full border-2 transition-colors duration-200 ${
            isHovering
              ? "border-nkAccent bg-nkAccent/20 shadow-[0_0_0_1px_rgba(20,184,166,0.3)]"
              : "border-white bg-white"
          }`}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="nk-cursor-layer pointer-events-none fixed left-0 top-0 z-[10052] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: blendMode,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.15 : 1,
        }}
        transition={{ type: "spring", stiffness: 360, damping: 28 }}
      >
        <div
          className={`h-2 w-2 rounded-full transition-colors duration-200 ${
            isHovering ? "bg-nkAccent shadow-[0_0_12px_rgba(20,184,166,0.65)]" : "bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
          }`}
        />
      </motion.div>
    </Fragment>
  );
}

export default CustomCursor;
