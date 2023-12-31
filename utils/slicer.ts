export function sliceText(name: string) {
  if (name?.length > 12) {
    return name.slice(0, 9) + "...";
  } else {
    return name;
  }
}
