## 📌 Question Link
[https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)

## 📝 Solution Remarks
Edge case: same number used twice is invalid

## 💻 Java Solution
```java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int comp = target - nums[i];
        if (map.containsKey(comp)) return new int[]{map.get(comp), i};
        map.put(nums[i], i);
    }
    return new int[]{};
}
```
