const code = `
function findMax(arr) {
  if (arr.length === 0) return null; // Handle empty array case
  let max = arr[0]; // Initialize max with the first element
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i]; // Update max if current element is greater
    }
  }
  return max; // Return the maximum value found
}`;
export default code;