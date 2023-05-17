#!/usr/bin/env node
const fetch = require('node-fetch')
const https = require('https')

/* 使用promise包裹原本的函式，並判斷是否有callback、本身是否是Promise */

const promisify =
    (fn) =>
    (...args) =>
        new Promise((resolve, reject) => {
            const customCallback = (result, error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            }

            try {
                const _args = [...args]
                const paramNames = getParams(fn.toString())
                const hasCallback =
                    paramNames.includes('cb') || paramNames.includes('callback')

                if (hasCallback) {
                    _args.push(customCallback)
                }

                const res = fn.call(this, ..._args)

                if (res instanceof Promise) {
                    res.then((r) => resolve(r))
                } else if (!hasCallback) {
                    resolve(res)
                }
            } catch (error) {
                reject(error)
            }
        })

/* with callback */

function double(a, cb) {
    return cb(a * 2)
}

function sum(num1, num2, cb) {
    if (!num1 || !num2) {
        return cb(null, new Error('invalid parameters'))
    }

    return cb(num1 + num2)
}

function httpRequestUser(params, cb) {
    const req = https.request(
        'https://jsonplaceholder.typicode.com/users',
        (res) => {
            let data = ''
            res.on('data', (chunk) => {
                data = data + chunk.toString()
            })

            res.on('end', () => {
                const body = JSON.parse(data)
                cb(body)
            })
        }
    )

    req.on('error', (error) => {
        console.log('An error', error)
    })

    req.end()
}

/* without callback */

const multi = (a) => {
    return a * a
}

/* Promisable */

function fetchUser(params) {
    return fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
        res.json()
    )
}

promisify(multi)(4).then((res) => {
    console.log('multi result', res)
})

promisify(double)(2).then((res) => {
    console.log('double result', res)
})

promisify(sum)(10, 50).then((res) => {
    console.log('sum result', res)
})

promisify(sum)(null, null).catch((error) => {
    console.log('sum error', error)
})

promisify(fetchUser)()
    .then((res) => {
        console.log('getUser res', res[0].name)
    })
    .catch((error) => {
        console.log('getUser error', error)
    })

promisify(httpRequestUser)({}).then((res) => {
    console.log('httpRequestUser res', res[0].name)
})

/** 如果沒有callback的，function前面加上async即可  */

async function yourFunc() {}

/* get function parameter names */

function getParams(func) {
    // String representation of the function code
    let str = func.toString()

    // Remove comments of the form /* ... */
    // Removing comments of the form //
    // Remove body of the function { ... }
    // removing '=>' if func is arrow function
    str = str
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/(.)*/g, '')
        .replace(/{[\s\S]*}/, '')
        .replace(/=>/g, '')
        .trim()

    // Start parameter names after first '('
    let start = str.indexOf('(') + 1

    // End parameter names is just before last ')'
    let end = str.length - 1

    let result = str.substring(start, end).split(', ')

    let params = []

    result.forEach((element) => {
        // Removing any default value
        element = element.replace(/=[\s\S]*/g, '').trim()

        if (element.length > 0) params.push(element)
    })

    return params
}
