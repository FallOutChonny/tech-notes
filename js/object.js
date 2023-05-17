/**
 *
 * @param {Object} obj
 * @retunrs Object
 */
function filter(obj, fn) {
    let res

    function _filter(o) {
        if (typeof o === 'object') {
            Object.keys(o).forEach((key) => {
                if (typeof o[key] === 'object' || Array.isArray(o[key])) {
                    _filter(o[key])
                } else if (fn(o[key])) {
                    res = o[key]
                    return
                }
            })
        } else if (Array.isArray(o)) {
            o.forEach((prop) => _filter(prop))
        } else if (fn(o)) {
            res = o
            return
        }
    }

    _filter(obj)

    return res
}

let obj = {
    b: 3,
    c: {
        d: {
            z: [1, 3, 4],
            b: {
                name: 'chonny',
            },
        },
        y: 'test',
    },
    k: [
        {
            g: {
                name: 'chonny',
            },
        },
    ],
}

console.log(filter(obj, (prop) => prop?.c?.d?.b?.name === 'chonny'))
