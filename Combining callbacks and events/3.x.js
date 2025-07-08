import { EventEmitter } from 'events'
import { readFile } from 'fs'

// 3.1 A simple event: Modify the asynchronous FindRegex class so that it
// emits an event when the find process starts, passing the input files list as
// an argument. Hint: beware of Zalgo!


// class FindRegex extends EventEmitter {
//     constructor(regex) {
//         super()
//         this.regex = regex
//         this.files = []
//     }
//     addFile(file) {
//         this.files.push(file)
//         return this
//     }
//     find() {
//         process.nextTick(() => {
//             this.emit('filestoread', this.files)
//         })

//         for (const file of this.files) {
//             readFile(file, 'utf8', (err, content) => {
//                 if (err) {
//                     return this.emit('error', err)
//                 }
//                 this.emit('fileread', file)
//                 const match = content.match(this.regex)

//                 if (match) {
//                     match.forEach(elem => this.emit('found', file, elem))
//                 }
//             })
//         }
//         return this
//     }
// }

// const findRegexSyncInstance = new FindRegex(/hello \w+/)
// findRegexSyncInstance
//     .addFile('fileA.txt')
//     .on('found', (file, match) => console.log(`[Before] Matched"${match}"`))
//     .on('filestoread', (files) => console.log(files))
//     .find()


// 3.2 Ticker: Write a function that accepts a number and a callback as the
// arguments. The function will return an EventEmitter that emits an event
// called tick every 50 milliseconds until the number of milliseconds is passed
// from the invocation of the function. The function will also call the callback
// when the number of milliseconds has passed, providing, as the result, the total
// count of tick events emitted. Hint: you can use setTimeout() to schedule
// another setTimeout() recursively.


// acreditei e fiz errado ;( tentativa x1
// i'm belive this but it's wrong :s attempt x1

// const countNumber = (number = 0, cb) => {
//     const eventEmmiter = new EventEmitter()

//     setTimeout(() => {
//         eventEmmiter.emit('tick', cb(number + 1, eventEmmiter))
//     }, 50);

//     return eventEmmiter
// }

// const callback = ((number, event) => {
//     if (number <= 50) {
//         setTimeout(() => {
//             event.emit('tick', callback(number + 1, event))
//         }, 50)

//         return number
//     }

//     return number
// })

// countNumber(0, callback).on('tick', (number) => console.log(number))

// 3.3 A simple modification: Modify the function created in exercise 3.2 so that
// it emits a tick event immediately after the function is invoked.


// 3.4 Playing with errors: Modify the function created in exercise 3.3 so that
// it produces an error if the timestamp at the moment of a tick (including the
// initial one that we added as part of exercise 3.3) is divisible by 5. Propagate
// the error using both the callback and the event emitter. Hint: use Date.now()
// to get the timestamp and the remainder (%) operator to check whether the
// timestamp is divisible by 5. 

const countMilisseconds = (number = 500, cb) => {
    const eventEmmiter = new EventEmitter
    const processTime = Date.now()
    let ticks = 1

    const recursively = () => {
        setTimeout(() => {
            const nowDate = Date.now()
            eventEmmiter.emit('tick')
            const difference = Math.abs(processTime - nowDate)

            ticks += 1

            if (nowDate % 5 === 0) {
                eventEmmiter.emit('error', `The number ${nowDate} is divisible by 5`, ticks)
                return cb(`The number ${nowDate} is divisible by 5`, ticks)
            }

            if (difference >= number) {
                return cb(undefined, ticks)
            }

            return recursively()
        }, 50)
    }


    process.nextTick(() => {
        eventEmmiter.emit('tick')
    })

    recursively()

    return eventEmmiter
}

const processTime = Date.now()

countMilisseconds(150, (error, ticks) => {
    if (error) {
        console.log(error)
        return
    }

    console.log(`${ticks}x`)
}).on('tick', () => {
    console.log(processTime - Date.now())
}).on('error', () => console.log('..'))