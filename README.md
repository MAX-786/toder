# Toder
Just my daily time pass tracker

> A GitHub repo to track coding practice using structured markdown files and automated commit hooks.

### Features

- 📌 Organize questions by `year/month/day`
- 🧹 Auto-generate markdown from a `source.txt`
- 🗑️ Clean up `source.txt` after generation

### Usage

1. ADD `source.txt`:
   - Line 1: question link
   - Line 2: opening triple backticks (```)
   - Line 3+: solution remarks
   - Line X: closing triple backticks (```)
   - Line X+: Java solution

#### Example `source.txt`
```txt
https://leetcode.com/problems/two-sum/
\```
easy, common, HashMap (IGNORE INITIAL BACKSLASH)
\```
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp))
                return new int[] { map.get(comp), i };
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}
```


2. Run:
   ```bash
   npm run sync
   ```
   And you're done!
