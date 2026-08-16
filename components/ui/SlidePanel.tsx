import { variants } from "@/lib/utils/variants";
import { motion } from "framer-motion";
import { ReactNode, Ref } from "react";

interface SlidePanelProps {
  direction: "left" | "right";
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export const SlidePanel = ({
  direction,
  className,
  children,
  ref,
}: SlidePanelProps) => {
  return (
    <motion.div
      ref={ref}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
      className={className ?? "flex flex-col h-full"}
    >
      {children}
    </motion.div>
  );
};
