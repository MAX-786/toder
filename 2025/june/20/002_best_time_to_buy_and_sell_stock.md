## 📌 Question Link
[https://leetcode.com/problems/best-time-to-buy-and-sell-stock/](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

## 📝 Solution Remarks
class Solution {
    public int maxProfit(int[] prices) {
        // Initialize minPrice to a very large value to ensure the first price becomes the min.
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;

        // Iterate through the prices array once.
        for (int i = 0; i < prices.length; i++) {
            // Check if we've found a new, lower price to buy at.
            if (prices[i] < minPrice) {
                minPrice = prices[i];
            } 
            // Check if selling at the current price gives us a better profit
            // than we've seen so far.
            else if (prices[i] - minPrice > maxProfit) {
                maxProfit = prices[i] - minPrice;
            }
        }
        
        return maxProfit;
    }
}

## 💻 Java Solution
```java
Revision Notes

    Problem: Best Time to Buy/Sell Stock (LC 121)

    Goal: Max profit from 1 buy & 1 sell transaction. Sell day > Buy day.

    Brute-Force: O(N^2). Nested loops to check every (buy_day, sell_day) pair. Too slow.

    Optimal Intuition: For any day i (as a potential sell day), the best possible profit is price[i] - (minimum price seen before day i).

    Optimal Core Idea: One Pass.

        Keep track of min_price_so_far.

        Keep track of max_profit.

        Iterate:

            Is current_price < min_price_so_far? Update min_price_so_far.

            Else, check if current_price - min_price_so_far > max_profit. Update max_profit.

    Critical DS/Algos: Single pass array traversal.

    Time/Space (Optimal): O(N) Time / O(1) Space.
```
