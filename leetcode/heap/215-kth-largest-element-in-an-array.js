/**
 * 215. Kth Largest Element in an Array
 *
Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

You must solve it in O(n) time complexity.



Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4


Constraints:

1 <= k <= nums.length <= 105
-104 <= nums[i] <= 104
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    const heap = new MinHeap()

    nums.forEach(n => {
        heap.insert(n)
        if (heap.size() > k) heap.extractMin()
    })

    return heap.peek()
}

class MinHeap {
    heap

    constructor() {
        this.heap = []
    }

    peek() {
        return this.heap[0]
    }

    size() {
        return this.heap.length
    }

    isEmpty() {
        return this.size() === 0
    }

    insert(val) {
        this.heap.push(val)
        this.heapifyUp(this.size() - 1)
    }

    extractMin() {
        if (this.isEmpty()) {
            return null
        }

        const minValue = this.top()
        const last = this.heap.pop()

        if (!this.isEmpty()) {
            this.heap[0] = last
            this.heapifyDown(0)
        }

        return minValue
    }

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
            this.heapifyDown(smallest)
        }
    }
}

console.log(findKthLargest([3,2,1,5,6,4], 2))
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4))