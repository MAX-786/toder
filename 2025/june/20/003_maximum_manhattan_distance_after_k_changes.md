## 📌 Question Link
[https://leetcode.com/problems/maximum-manhattan-distance-after-k-changes](https://leetcode.com/problems/maximum-manhattan-distance-after-k-changes)

## 📝 Solution Remarks
Revision Notes

    Problem: Max Manhattan Distance with K changes in a path string.

    Goal: Maximize |x_i| + |y_i| for any step i, using at most k changes.

    Brute-Force: Try all C(n,k) * 3^k string changes. Impossible.

    Optimal Intuition: Axis Independence. Manhattan distance |x| + |y| lets us solve for X and Y separately.

    Optimal Core Idea:

        Subproblem: For each axis, find the max distance possible for a given cost c.

        Create maxX[c] & maxY[c] arrays storing this info.

        Populate: Iterate through string. At each step i, we know the cost to maximize distance (e.g., # of 'S' moves) and the resulting value (#N + #S). Update the array for that cost.

        Post-process: Propagate maxes. arr[c] = max(arr[c], arr[c-1]) so it reflects "at most" cost c.

        Combine: The final answer is max(maxX[c] + maxY[k-c]) over all c from 0 to k.

    Critical DS/Algos: Dynamic Programming (on the cost k).

    Time/Space (Optimal): O(N + K) Time / O(K) Space.

## 💻 Java Solution
```java
class Solution {
    public int maxManhattanDistance(String s, int k) {
        // Step 1: Calculate max distances achievable for each axis for costs 0 to k.
        int[] maxY = getMaxDistByCost(s, k, 'N', 'S');
        int[] maxX = getMaxDistByCost(s, k, 'E', 'W');
        
        int maxTotalDist = 0;
        
        // Step 2: Combine results by splitting the budget k between the two axes.
        for (int kx = 0; kx <= k; kx++) {
            int ky = k - kx;
            int currentTotalDist = maxX[kx] + maxY[ky];
            maxTotalDist = Math.max(maxTotalDist, currentTotalDist);
        }
        
        return maxTotalDist;
    }
    
    /**
     * Calculates an array where arr[c] is the max distance on one axis
     * achievable at any point during the traversal with at most c changes.
     */
    private int[] getMaxDistByCost(String s, int k, char dir1, char dir2) {
        int[] dist = new int[k + 1];
        int count1 = 0; // e.g., count of 'N'
        int count2 = 0; // e.g., count of 'S'
        
        // First pass: Calculate max distance for an EXACT cost.
        for (int i = 0; i < s.length(); i++) {
            char move = s.charAt(i);
            if (move == dir1) {
                count1++;
            } else if (move == dir2) {
                count2++;
            }
            
            // At this step i, the max possible distance on this axis is count1 + count2.
            // This is achieved by changing all dir2 to dir1 (cost=count2) or vice-versa (cost=count1).
            int maxPossibleDist = count1 + count2;
            
            // Cost to make all moves dir1
            int costForDir1 = count2;
            if (costForDir1 <= k) {
                dist[costForDir1] = Math.max(dist[costForDir1], maxPossibleDist);
            }
            
            // Cost to make all moves dir2
            int costForDir2 = count1;
            if (costForDir2 <= k) {
                dist[costForDir2] = Math.max(dist[costForDir2], maxPossibleDist);
            }
        }
        
        // Post-processing: Propagate maxes so dist[c] means AT MOST cost c.
        for (int c = 1; c <= k; c++) {
            dist[c] = Math.max(dist[c], dist[c - 1]);
        }
        
        return dist;
    }
}
```
