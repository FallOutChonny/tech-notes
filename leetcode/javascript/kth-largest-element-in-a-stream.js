/**
 * 703. Kth Largest Element in a Stream

 * Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Implement KthLargest class:

KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.
int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.


Example 1:

Input
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output
[null, 4, 5, 5, 8, 8]

Explanation
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8


Constraints:

1 <= k <= 104
0 <= nums.length <= 104
-104 <= nums[i] <= 104
-104 <= val <= 104
At most 104 calls will be made to add.
It is guaranteed that there will be at least k elements in the array when you search for the kth element.
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
    this.k = k
    this.queue = new MinHeap()

    nums.forEach((n) => {
        this.queue.insert(n)
        if (this.queue.size() > k) this.queue.extractMin()
    })
}

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
    this.queue.insert(val)
    if (this.queue.size() > this.k) this.queue.extractMin()
    return this.queue.top()
}

// https://www.codesdope.com/blog/article/priority-queue-using-heap/
// https://www.codesdope.com/course/data-structures-priority-queues/
class MinHeap {
    constructor() {
        this.heap = []
    }

    top() {
        return this.heap[0]
    }

    // 返回堆的大小
    size() {
        return this.heap.length
    }

    // 空判斷
    isEmpty() {
        return this.size() === 0
    }

    // 添加一個元素
    insert(value) {
        this.heap.push(value)
        this.heapifyUp(this.size() - 1)
    }

    // 取出最小值並移除
    extractMin() {
        if (this.isEmpty()) {
            return null
        }

        console.log('before extractMin', this.heap)

        const minValue = this.heap[0]
        const last = this.heap.pop()

        console.log('extractMin ~ minValue and root', minValue, last)

        if (!this.isEmpty()) {
            this.heap[0] = last
            console.log('start heapifyDown', this.heap)
            this.heapifyDown(0)
        }

        return minValue
    }

    /**
     *  向上修復堆
        用途：當我們向堆中插入一個新元素時，新元素可能破壞堆的性質。為了維護堆性質，我們需要通過將該元素向上移動的方式來修復堆。
        邏輯：
        1. 計算父節點的索引，即 `Math.floor((index - 1) / 2)`。
        2. 如果父節點索引小於0，說明已經到達堆頂，結束修復過程。
        3. 如果新元素值小於父節點的值，就交換新元素和父節點的位置。
        4. 重複以上步驟，直到新元素到達堆頂或滿足堆的性質。
     */
    heapifyUp(index) {
        const parentIndex = Math.floor((index - 1) / 2)
        if (parentIndex < 0) {
            return
        }

        if (this.heap[parentIndex] > this.heap[index]) {
            ;[this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]]
            this.heapifyUp(parentIndex)
        }
    }

    /**
     *  向下修復堆
        用途：當我們從堆中移除最小的元素（最小堆的頂部元素）時，移除操作很可能破壞堆的性質。為了維護堆性質，我們需要通過將新的頂部元素（一般為最後一個玩家）向下移動的方式來修復堆。
        邏輯：
        1. 計算左子節點和右子節點的索引，即 `2 * index + 1` 和 `2 * index + 2`。
        2. 尋找當前節點、左子節點和右子節點中具有最小值的節點。
        3. 如果當前節點不是具有最小值的節點，則將當前節點的值與具有最小值的子節點進行交換。
        4. 重複以上步驟，直到當前節點成功移到其正確的位置上或達到堆的底部。
     */
    heapifyDown(index) {
        const leftChildIndex = 2 * index + 1
        const rightChildIndex = 2 * index + 2

        let smallest = index

        if (leftChildIndex < this.size() && this.heap[leftChildIndex] < this.heap[smallest]) {
            smallest = leftChildIndex
        }

        if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[smallest]) {
            smallest = rightChildIndex
        }

        if (smallest !== index) {
            ;[this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]]
            console.log(this.heap)
            this.heapifyDown(smallest)
        }
    }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

var kthLargest = new KthLargest(3, [4, 5, 8, 2])
// console.log(kthLargest.add(3)) // return 4
// console.log(kthLargest.queue.heap)
// console.log(kthLargest.add(5)) // return 5
// console.log(kthLargest.queue.heap)
// console.log(kthLargest.add(10)) // return 5
// console.log(kthLargest.queue.heap)
// console.log(kthLargest.add(9)) // return 8
// console.log(kthLargest.queue.heap)
// console.log(kthLargest.add(4)) // return 8
// console.log(kthLargest.queue.heap)