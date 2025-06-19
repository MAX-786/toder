## 📌 Question Link
[https://leetcode.com/problems/maximum-subarray/](https://leetcode.com/problems/maximum-subarray/)

## 📝 Solution Remarks
Revision Notes

    Problem: Maximum Subarray (LC 53)

    Goal: Find the largest sum of a contiguous subarray.

    Brute-Force Core Idea: O(N^2). Use two nested loops to check every possible start/end pair (i, j) and calculate its sum.

    Optimal Intuition: One pass is enough. The key idea is to find the max subarray that ends at the current position.

    Optimal Core Idea (Kadane's Algorithm):

        currentMax = what's the best sum ending here? It's either this_number alone, or this_number + previous_currentMax. So currentMax = max(n, currentMax + n).

        globalMax = what's the best sum found anywhere so far? globalMax = max(globalMax, currentMax).

    Critical DS/Algorithms Used: Dynamic Programming.

    Time/Space (Optimal): Time: O(N), Space: O(1).

## 💻 Java Solution
```java
class Solution {
    public int maxSubArray(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        // Initialize both the current max and global max to the first element.
        int currentMax = nums[0];
        int globalMax = nums[0];

        // Loop from the second element to the end of the array.
        for (int i = 1; i < nums.length; i++) {
            int num = nums[i];
            
            // The core of Kadane's algorithm:
            // Do we extend the previous subarray or start a new one?
            // A new subarray is started if the current number itself is greater
            // than the sum of the current number and the previous running max.
            currentMax = Math.max(num, currentMax + num);
            
            // After finding the max subarray that ENDS at the current position,
            // we update our overall global max.
            globalMax = Math.max(globalMax, currentMax);
        }
        
        return globalMax;
    }
}
```
