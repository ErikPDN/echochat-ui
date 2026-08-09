const AVATAR_COLORS = [
  "#FF5733",
  "#33C1FF",
  "#8E44AD",
  "#27AE60",
  "#F39C12",
  "#E74C3C",
  "#3498DB",
  "#1ABC9C",
  "#9B59B6",
  "#E67E22",
];

export const stringToColor = (seed: string): string => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const idx = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
};
