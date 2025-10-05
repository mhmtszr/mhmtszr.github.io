/**
 * Estimates reading time for text content
 * @param text The text content to analyze
 * @param wordsPerMinute Average reading speed (default: 200)
 * @returns Estimated reading time in minutes
 */
export function estimateReadingTime(text: string, wordsPerMinute = 200): string {
  // Remove all html tags
  const cleanText = text.replace(/<\/?[^>]+(>|$)/g, '');
  
  // Count words (split by whitespace)
  const words = cleanText.trim().split(/\s+/).length;
  
  // Calculate reading time
  const minutes = Math.ceil(words / wordsPerMinute);
  
  // Format the result
  return minutes === 1 ? '1 min read' : `${minutes} min read`;
} 