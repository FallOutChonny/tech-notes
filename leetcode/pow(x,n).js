/**
 * 50. Pow(x, n)
Implement pow(x, n), which calculates x raised to the power n (i.e., xn).

Example 1:

Input: x = 2.00000, n = 10
Output: 1024.00000
Example 2:

Input: x = 2.10000, n = 3
Output: 9.26100
Example 3:

Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2-2 = 1/22 = 1/4 = 0.25


Constraints:

-100.0 < x < 100.0
-231 <= n <= 231-1
-104 <= xn <= 104

利用分治法去遞迴，能夠減少乘的次數，從而提高時間複雜度。
1. x的n次冪可以分解為x的n/2次冪的平方。
2. 按照步驟1的思路，通過遞迴逐級分解，時間複雜度即為O(logn)。
3. 如果n為負，問題可以轉換為計算1除以x的n次冪。

 * @param {number} x
 * @param {number} n
 * @return {number}
 */
let c = 1
var myPow = function (x, n) {
    // n === 0 return 1
    if (!n) return 1
    // n 如果除 2 不為零，則 x * myPow(x, n - 1)
    if (n % 2) return x * myPow(x, n - 1)
    // 負數次方等於 1 / x的n次方
    if (n < 0) return 1 / myPow(x, -n)
    // x 的 n 次方等於 x*x 的 n/2 次方
    return myPow(x * x, n / 2)
}

/**
 * 2.1 的 3 次方
 * myPow(2.1 * 2.1, 1)
 *
 */

console.log(myPow(2, 10))
// console.log(myPow(2.1, 3))
// console.log(myPow(2, -2))
// console.log(myPow(0.00001, 2147483647))
