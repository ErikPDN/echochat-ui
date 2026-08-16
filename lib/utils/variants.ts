export const variants = {
  enter: (dir: "left" | "right") => ({
    x: dir === "right" ? "100%" : "-100%",
  }),
  center: { x: 0 },
  exit: (dir: "left" | "right") => ({
    x: dir === "right" ? "-100%" : "100%",
  }),
};
