Array.prototype.myfilter = function (fn) {
    const res = []

    for (let i = 0; i < this.length; i++) {
        if (fn(this[i])) {
            res[i] = this[i]
        }
    }

    return res
}

Array.prototype.mymap = function (fn) {
    let res = []

    for (let i = 0; i < this.length; i++) {
        res[i] = fn(this[i])
    }

    return res
}

Array.prototype.myreduce = function (fn, initialValue) {
    let res = initialValue
    let i = 0

    if (typeof initialValue === undefined) {
        res = this[i]
        i += 1
    }

    for (i; i < this.length; i++) {
        res = fn(res, this[i])
    }

    return res
}

/**
 * https://juejin.cn/post/6844903941046550542
 * 1. sort()方法没有参数时，按照ascii码进行排序
 * 2. 通过给sort()的参数返回一个负值可以实现数组reverse()效果
 * 3. sort(next,prev) 参数返回 next - prev时，数组是升序，返回-(next - prev) 即prev - next时，数组是降序
 * 4. 通过以上的比较我们还是可以看出sort()方法效率还是挺高的，可以直接使用
 * 5. 一般情况下，对数组进行排序使用快速排序或者sort(),在已知数据规律时才考虑其他排序方式
 * @param {Function} fn
 * @returns Array
 */
Array.prototype.mysort = function (fn) {


    return this
}

Array.prototype.mypush = function (item) {
    this[this.length] = item
    return this.length
}

Array.prototype.myconcat = function (items) {
    // https://eudora.cc/posts/210430/
    let res = Array.from(this)
    for (let i = 0; i < items.length; i++) {
        res[res.length] = items[i]
    }

    return res
}

Array.prototype.myfind = function (fn) {
    let res
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i])) {
            res = this[i]
            break
        }
    }

    return res
}

Array.prototype.myfindIndex = function () {
    let res
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i])) {
            res = i
            break
        }
    }

    return res
}

let a = [1, 2, 3, 3, 6, 6, 6, 7]
let b = [{ name: 'chonny' }, { name: 'john' }]

// console.log(a.myfilter((x) => x !== 6))
// console.log(a.mymap((x) => x * 2))
// console.log(a.myreduce((res, curr) => (res += curr), 0))
// console.log(a.mypush(8))
// console.log(a.myfind((x) => x === 7))
// console.log(b.myfind((x) => x.name === 'chonny'))
console.log(a.myconcat([9, 9, 9]))
console.log(a.mysort((a, b) => a - b))
