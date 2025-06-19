## 📌 Question Link
[https://leetcode.com/problems/next-permutation/](https://leetcode.com/problems/next-permutation/)

## 📝 Solution Remarks
Revision Notes

    Problem: Next Permutation (LC 31)

    Goal: Find next lexicographically greater arrangement. Must be in-place O(1) space.

    Brute-Force: O(N!). Generate all, sort, find next. Impractical.

    Optimal Intuition: To make a number just a bit bigger, modify its rightmost part.

    Optimal Algorithm Steps:

        Find Pivot: Scan from right. Find first i where nums[i] < nums[i+1].

        Edge Case: If no pivot found (i=-1), array is like [3,2,1]. Reverse all -> [1,2,3]. Done.

        Find Successor: Scan from right. Find first j where nums[j] > nums[i].

        Swap: swap(nums, i, j).

        Reverse Suffix: reverse the part of the array from i+1 to the end.

    Critical DS/Algos: In-place array manipulation, two-pointer reverse.

    Time/Space (Optimal): Time: O(N), Space: O(1).

## 💻 Java Solution
```java
class Solution {
    public void nextPermutation(int[] nums) {
        if (nums == null || nums.length <= 1) {
            return;
        }

        // Step 1: Find the first decreasing element from the right (the pivot).
        int i = nums.length - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }

        // Now, i is the index of the pivot.
        // If i is not -1, a next permutation is possible.
        if (i >= 0) {
            // Step 2: Find the element just larger than the pivot from the right.
            int j = nums.length - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            // Now, j is the index of the successor.
            
            // Step 3: Swap the pivot and its successor.
            swap(nums, i, j);
        }

        // Step 4: Reverse the suffix part (from i+1 to the end).
        // If i was -1 (the whole array was descending), this will reverse the whole array.
        reverse(nums, i + 1, nums.length - 1);
    }

    // Helper function to swap two elements in the array.
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    // Helper function to reverse a subarray.
    private void reverse(int[] nums, int start, int end) {
        while (start < end) {
            swap(nums, start, end);
            start++;
            end--;
        }
    }
}
```
