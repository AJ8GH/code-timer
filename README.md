code-timer ⏱
=============

[![Build Status](https://travis-ci.com/AJ8GH/code-timer.svg?branch=main)](https://travis-ci.com/AJ8GH/code-timer) [![Maintainability](https://api.codeclimate.com/v1/badges/510048d893759d26f6d5/maintainability)](https://codeclimate.com/github/AJ8GH/code-timer/maintainability) [![BCH compliance](https://bettercodehub.com/edge/badge/AJ8GH/code-timer?branch=main)](https://bettercodehub.com/) [![codecov](https://codecov.io/gh/AJ8GH/code-timer/branch/main/graph/badge.svg?token=KYZ9V6KT96)](https://codecov.io/gh/AJ8GH/code-timer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
 <a href="https://standardjs.com" style="float: right; padding: 0 0 20px 20px;"><img src="https://cdn.rawgit.com/feross/standard/master/sticker.svg" alt="Standard JavaScript" width="100" align="right"></a>

A flexible and easy to use code timing framework.

Time algorithms, functions, or single lines to measure effiency and locate high-cost operations.

[Usage](#usage) | [Getting Started](#getting-started) | [Manual timing](#manual-usage) | [Automated Timing](#automated-timing) | [Timing Custom Functions](#timing-a-custom-function) | [Timing Built-in Functions](#timing-a-built-in-array-function) | [Timing Integer Functions](#timing-integer-functions) | [Automated Timing of multiple Inputs](#timing-increasing-input-sizes) | [Development](#developer-section)

[Available on NPM](https://www.npmjs.com/package/@aj8/code-timer)

## Usage

**The framework can be used:**
- As a manual timer to time any code, using the `#start()` and `#stop()` functions.
- To time built in functions or custom made algorithms.
- To time an algorithm on a single array or integer using the `#Time()` function.
- To time an algorithm on multiple arrays or integers with increasing size using the `#run()` function.

**Class responsibilities:**
- The `CodeTimer` class is responsible for timing the code.
- The `CodeRunner` class is responsible for running the timer on multiple inputs.
- The `InputGenerator` class is responsible for creating arrays of random numbers to run the algorithms on.
- The `Printer` class is responsible for outputting the method name, input size and run time to the terminal after each run.

### Getting Started

Add to your package as a development dependency:

```shell
npm i -D @aj8/code-timer
```

Import into your project:

```js
import codeTimer from 'code-timer'
```

Ensure `type` is set to `module` in your `package.json`:

```json
// package.json
{
  "type": "module"
}
```

And you are ready to start timing some code.

---

### Manual usage

Use `#start()` and `#stop()` manually to time any code.

```js
codeTimer = new codeTimer()

codeTimer.start()
// code you want to time
codeTimer.stop()

codeTimer.runTime()
// run time of your code in ms
```

----

## Automated timing

Use codeTimer `#time()` to time how long any function takes to run. By default, it will auto generate an array of random numbers and run the function on the array.

The function is fully customisable. It takes an object argument, which can contain the following properties:

property   | Description                                                               | Input type | default | Required
-----------|---------------------------------------------------------------------------|------------|---------|----------
`method`   | method you want to time                                                   | function   | None    | Yes
`size`     | size of the input array to run                                            | Integer    | `1000`  | No
`custom`   | set to true to specify that method is not a native function               | Boolean    | `false` | No
`args`     | arguments to call the method with                                         | array      | `[]`    | No
`Integer`  | set to true to call the method on the `size` integer, instead of an array | Boolean    | `false` | No

The data from the last run can be accessed through the properties:
* `codeTimer.method`
* `codeTimer.startTime`
* `codeTimer.arraySize`
* `codeTimer.stopTime`

The run time can be accessed via the runTime function: `codeTimer.runTime()`

Use the `codeTimer.printResults()` function to log the method name, input size and run time of the last run, to the terminal.

To time a function on multiple arrays increasing in size, use the `#run()` function - see [timing increasing input sizes](#timing-increasing-input-sizes)

### Timing a built in array function

To time a built in array function, pass the function as the method property in the argument object:
```
[].<functionName>
```

Example - time the built in Javascript `array.sort()` function, on an array of 20,000 elements:

```js
import codeTimer from 'code-timer'

const codeTimer = new codeTimer()

const options = { method: [].sort, size: 20000 }

codeTimer.time(options)
// runs the method and records the start time, stop time, run time, input size and method
// return value is the run time in ms

codeTimer.runTime()
// returns the run time of the last run in ms

codeTimer.printResults()
// prints the method name, array size and run time of the last run to the terminal
```

### Timing a custom function

Add `custom: true` in the argument object to time a custom method.

```js
const last = (array) => { return array[array.length -1] }

const options = { method: last, custom: true }

codeTimer.time(options)
```

### Timing integer functions

Add `integer: true` in the argument object to time an integer method. Instead of generating the random number array, it will run on the integer value of the size property. This example will run `fibonacci(5000)`

```js
const fibonacci = (integer) => { return /* code which returns fibbonacci numbers */ }

const options = {
  method: fibonacci,
  custom: true,
  integer: true,
  size: 5000
}

codeTimer.time(options)
```

To time a function on multiple integers increasing in size, use the `#run()` function with the integer property set to true - see [timing increasing input sizes](#timing-increasing-input-sizes)

### Calling a function with arguments

Use the Args property with an array of 1 or more arguments, to time the function with those arguments:

```js
const options = { method: [].unshift, args: [1] }

codeTimer.time(options)
// will call array.push(1)

const options = { method: [].unshift, args: [1, 2, 3] }

codeTimer.time(options)
// will call array.push(1, 2, 3)
```

----

### Timing increasing input sizes

`#run()` times a function on multiple inputs of increasing size. After each run, the results are output to the terminal:

```
<method> => Input size: <size-of-array-or-integer-function-was-executed-on>, Run Time: <run-time-in-ms>
```

Arrays of random numbers are auto-generated for each run. Each input increases in size by a step of the initial size value. Can be used to time array functions and integers

The function will run with 5 additional warm up inputs at the start, the same size as the starting input size. This is to warm up the system and reduce spikes. The number of runs and the number of warm ups can be customised.

property   | Description                                                               | Input type | Default | Required
-----------|---------------------------------------------------------------------------|------------|---------|----------
`method`   | method you want to time                                                   | Function   | None    | Yes
`size`     | size of the initial input array                                           | Integer    | `1000`  | No
`custom`   | specifies that method is not a native function                            | Boolean    | `false` | No
`args`     | arguments to call the method with                                         | Array      | `[]`    | No
`runs`     | number of times to execute the method under test                          | Integer    | `20`    | No
`warmUp`   | number of warm up runs to execute                                         | Integer    | `5`     | No
`Integer`  | set to true to call the method on the `size` integer, instead of an array | Boolean    | `false` | No

### Example Usage

Using run to time a custom reverse algorithm on random number arrays, to run 10 times, on inputs from 1,000,000 to 10,000,000, with 3 warm up runs:

```js
const reverse = () => { /* reversing algorithm */ }

const options = {
  method: reverse,
  warmUp: 3,
  custom: true,
  size: 10000,
  runs: 10
}

codeTimer.run(options)
```

The resulting output in the terminal in the following format:

```
#reverse() => Input size: 1000000, Run time: 1
#reverse() => Input size: 1000000, Run time: 1
#reverse() => Input size: 1000000, Run time: 1
#reverse() => Input size: 1000000, Run time: 1
#reverse() => Input size: 2000000, Run time: 2
#reverse() => Input size: 3000000, Run time: 2
#reverse() => Input size: 4000000, Run time: 3
#reverse() => Input size: 5000000, Run time: 3
#reverse() => Input size: 6000000, Run time: 3
#reverse() => Input size: 7000000, Run time: 4
#reverse() => Input size: 8000000, Run time: 5
#reverse() => Input size: 9000000, Run time: 6
#reverse() => Input size: 10000000, Run time: 6
```

A simple example:

```js
const codeTimer = new CodeTimer()

codeTimer.run({ method: [].sort })
```

To specify a different number of runs, simply add it as a property:

```js
codeTimer.run({ method: [].sort, runs: 5 })
```

To run a custom function, add `custom: true` as a property:

```js
codeTimer.run({ method: myFunction, runs: 5, custom: true })
```

To change the number of warm up runs:

```js
codeTimer.run({ method: reverse, warmUp: 3, custom: true })
```

----

## Developer Section

### Development Dependencies

- `"c8": "^7.7.2",`
- `"chai": "^4.3.4",`
- `"chai-spies": "^1.0.0",`
- `"codecov": "^3.8.2",`
- `"eslint": "^7.26.0",`
- `"eslint-config-standard": "^16.0.2",`
- `"eslint-plugin-import": "^2.23.2",`
- `"eslint-plugin-node": "^11.1.0",`
- `"eslint-plugin-promise": "^4.3.1",`
- `"mocha": "^8.4.0",`
- `"nyc": "^15.1.0",`
- `"sinon": "^10.0.0"`

### Getting Started

* Clone this repository: `git clone git@github.com:AJ8GH/algo-timer.git`
* Navigate to project root and install dependencies: `cd algo-timer && npm i`

## Running Tests

```shell
npm test
```
