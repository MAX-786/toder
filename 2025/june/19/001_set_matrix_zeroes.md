## 📌 Question Link
[https://leetcode.com/problems/set-matrix-zeroes/](https://leetcode.com/problems/set-matrix-zeroes/)

## 📝 Solution Remarks
Revision Notes

    Problem: Set Matrix Zeroes

    Goal: If matrix[i][j] is 0, make entire row i & col j zero. In-place.

    Brute-Force Core Idea: Use 2 extra arrays (O(m+n) space) to mark rows/cols to be zeroed. 2 passes: 1st to mark, 2nd to set. Avoids chain reaction.

    Optimal Intuition: No extra arrays allowed! Use the matrix itself.

    Optimal Core Idea:

        Use 1st row and 1st col as marker arrays.

        matrix[0][0] is ambiguous. So use a separate boolean flag (isFirstColZero) to store state of 1st column.

        Use matrix[0][0] to store state of 1st row.

        Order is CRITICAL:

            Scan matrix to set markers in 1st row/col.

            Update the inner matrix (from [1,1]) based on markers.

            Update the 1st row and 1st col based on their saved states (matrix[0][0] and the boolean flag).

    Critical DS/Algos Used: In-place modification, Matrix traversal.

    Time/Space Complexity (Optimal): Time: O(m*n), Space: O(1).

## 💻 Java Solution
```java
class Solution {
    public void setZeroes(int[][] matrix) {
        if (matrix == null || matrix.length == 0) {
            return;
        }

        int m = matrix.length;
        int n = matrix[0].length;
        boolean isFirstColZero = false;

        // Step 1: Use the first row and first column as markers.
        // We need a special flag for the first column because matrix[0][0] is used for the first row.
        for (int i = 0; i < m; i++) {
            // Check if the first column needs to be zeroed.
            if (matrix[i][0] == 0) {
                isFirstColZero = true;
            }
            
            // For the rest of the matrix, use the first row/col for marking.
            // Start from j=1 because we've handled the first column's state separately.
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0; // Mark the row
                    matrix[0][j] = 0; // Mark the column
                }
            }
        }
        
        // Step 2: Zero out the inner matrix based on the markers.
        // We iterate from 1,1 to avoid overwriting our markers prematurely.
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }

        // Step 3: Zero out the first row if needed.
        // This must come after step 2, otherwise we lose our column markers.
        if (matrix[0][0] == 0) {
            for (int j = 0; j < n; j++) {
                matrix[0][j] = 0;
            }
        }

        // Step 4: Zero out the first column if needed.
        // This must be last, using our saved flag.
        if (isFirstColZero) {
            for (int i = 0; i < m; i++) {
                matrix[i][0] = 0;
            }
        }
    }
}
```
