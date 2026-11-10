export function calculateRating(rating: number) {
  if (!Number.isFinite(rating)) return 0;
  return Math.round(Math.min(5, Math.max(0, rating)));
}