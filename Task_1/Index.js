function findLargestEvenSubarray(arr) {
    let maxSum = 0;
    let maxLength = 0;
    let start = -1;
    let end = -1;
    let currentSum = 0;
    const sumMap = new Map();
    sumMap.set(0, -1);
    
    for (let i = 0; i < arr.length; i++) {
      const num = arr[i];
      currentSum += num;
      
      // Check if the current sum is even
      if (currentSum % 2 === 0) {
        // Update the max length and max sum
        if (i + 1 > maxLength || (i + 1 === maxLength && currentSum > maxSum)) {
          maxLength = i + 1;
          maxSum = currentSum;
          start = 0;
          end = i;
        }
      } else {
        // Check if we have seen this odd sum before
        if (sumMap.has(currentSum - 1)) {
          const prevIndex = sumMap.get(currentSum - 1);
          // Update the max length and max sum
          if (i - prevIndex > maxLength || (i - prevIndex === maxLength && currentSum > maxSum)) {
            maxLength = i - prevIndex;
            maxSum = currentSum;
            start = prevIndex + 1;
            end = i;
          }
        } else if (!sumMap.has(currentSum)) {
          // Add the current sum to the map
          sumMap.set(currentSum, i);
        }
      }
    }
    
    // Return the largest even subarray, or an empty array if no even subarray exists
    return start >= 0 ? arr.slice(start, end + 1) : [];
  }
  
  console.log(findLargestEvenSubarray([1,2,3,4,5]));
  