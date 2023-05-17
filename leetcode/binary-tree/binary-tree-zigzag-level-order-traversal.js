/**
 * 103. Binary Tree Zigzag Level Order Traversal
 *
Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).



Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []


Constraints:

The number of nodes in the tree is in the range [0, 2000].
-100 <= Node.val <= 100
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
    const map = []

    let zigzag = false

    const find = function (node, level) {
        if (!node) return

        if (!map[level]) map[level] = []

        map[level].push(node.val)

        if (node.left) find(node.left, level + 1)
        if (node.right) find(node.right, level + 1)
    }

    find(root, 0)

    const result = []

    map.forEach((values, index) =>
        result.push(index % 2 !== 0 ? values.reverse() : values)
    )

    return result
}

// Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
}

console.log(
    zigzagLevelOrder(
        new TreeNode(
            3,
            new TreeNode(9),
            new TreeNode(20, new TreeNode(15), new TreeNode(7))
        )
    )
)
console.log(
    zigzagLevelOrder(
        new TreeNode(
            3,
            new TreeNode(9, new TreeNode(6), new TreeNode(12)),
            new TreeNode(20, new TreeNode(15), new TreeNode(7))
        )
    )
)
console.log(zigzagLevelOrder(new TreeNode(1)))

console.log(zigzagLevelOrder())
