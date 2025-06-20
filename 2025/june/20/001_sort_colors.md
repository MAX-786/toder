## 📌 Question Link
[https://leetcode.com/problems/sort-colors/](https://leetcode.com/problems/sort-colors/)

## 📝 Solution Remarks
Revision Notes

    Problem: Sort Colors (LC 75) aka Dutch National Flag.

    Goal: Sort an array of [0,1,2] in-place & in a single pass.

    Brute-Force Idea: Two-pass Counting Sort. O(N) time, O(1) space. Pass 1: count 0s, 1s, 2s. Pass 2: overwrite the array. Good, but not one-pass.

    Optimal Intuition: Partition the array into three sections [0s | 1s | 2s] dynamically.

    Optimal Core Idea (3 Pointers):

        p0: boundary for 0s.

        p2: boundary for 2s.

        curr: scans the array.

        Loop while (curr <= p2):

            If nums[curr] == 0: swap(curr, p0), p0++, curr++.

            If nums[curr] == 2: swap(curr, p2), p2--. DON'T touch curr.

            If nums[curr] == 1: curr++.

    Critical DS/Algos: Three-way partitioning, In-place sorting.

    Time/Space (Optimal): O(N) / O(1).

## 💻 Java Solution
```java
class Solution {
    public void sortColors(int[] nums) {
        if (nums == null || nums.length < 2) {
            return;
        }

        // p0 points to the position for the next 0
        int p0 = 0;
        // p2 points to the position for the next 2
        int p2 = nums.length - 1;
        // curr is the current element under consideration
        int curr = 0;

        while (curr <= p2) {
            if (nums[curr] == 0) {
                // If it's a 0, swap it to the front section
                swap(nums, curr, p0);
                p0++;
                curr++;
            } else if (nums[curr] == 2) {
                // If it's a 2, swap it to the back section
                swap(nums, curr, p2);
                p2--;
                // Note: We do NOT increment curr here, because the element we
                // just brought from p2 needs to be processed.
            } else { // nums[curr] == 1
                // If it's a 1, it's in the right place (for now). Move on.
                curr++;
            }
        }
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```
