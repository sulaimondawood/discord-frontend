export const colors = [
  // "orange-500"
  "#679eea",
  "#ff4d4d",
  "#ffff00",
  "#ffff99",
  "#ff8533",
  "#a6ff4d",
  "#e6ffcc",
  "#99ccf",
  "#0080ff",
  "#00ffff",
  "#e6ffff",
  "#8080ff",
  "#ffff99",
];

export function getRandom() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
