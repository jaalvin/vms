// Simple className joiner - replaces tailwind-merge/clsx
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
