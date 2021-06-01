code-timer ⏱
=============

[![Build Status](https://travis-ci.com/AJ8GH/code-timer.svg?branch=main)](https://travis-ci.com/AJ8GH/code-timer) [![Maintainability](https://api.codeclimate.com/v1/badges/510048d893759d26f6d5/maintainability)](https://codeclimate.com/github/AJ8GH/code-timer/maintainability) [![BCH compliance](https://bettercodehub.com/edge/badge/AJ8GH/code-timer?branch=main)](https://bettercodehub.com/) [![codecov](https://codecov.io/gh/AJ8GH/code-timer/branch/main/graph/badge.svg?token=KYZ9V6KT96)](https://codecov.io/gh/AJ8GH/code-timer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
 <a href="https://standardjs.com" style="float: right; padding: 0 0 20px 20px;"><img src="https://cdn.rawgit.com/feross/standard/master/sticker.svg" alt="Standard JavaScript" width="100" align="right"></a>

A flexible and easy to use code timing framework.

Time algorithms, functions, or single lines to measure effiency and locate high-cost operations.

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

### Timing a built in function

Using codeTimer `#time()` to time how long a function takes to process an array of random numbers.

It takes an object argument, which can contain the following properties:

property   | Description                                                               | Input type | default
-----------|---------------------------------------------------------------------------|------------|--------
`method`   | method you want to time                                                   | function   | None
`size`     | size of the input array to run                                            | Integer    | `1000`
`custom`   | set to true to specify that method is not a native function               | Boolean    | `false`
`args`     | arguments to call the method with                                         | array      | `[]`
`Integer`  | set to true to call the method on the `size` integer, instead of an array | Boolean    | `false`

### Example Usage

Time the `array.sort()` method, on an array of 20,000 elements:

```js
import codeTimer from 'code-timer'

const codeTimer = new codeTimer()

const options = {method: [].sort, size: 20000}

codeTimer.time()
// runs the method and records the data
// returns the run time in ms

codeTimer.runTime()
// returns the run time in ms

codeTimer.printResults()
// prints the method name, array size and run time
```

### Timing a custom function

Add `custom: true` in the argument object to use codeTimer #time() to time a custom method.

```js
const codeTimer = new codeTimer()

const last = (array) => { return array[array.length -1] }

const options = {method: last, custom: true }
```

### Running a function on an integer instead of an array

Add `integer: true` in the argument object to use codeTimer #time() to time a custom method.

```js
const codeTimer = new codeTimer()

const fibonacci = (integer) => { return /* code which returns fibbonacci numbers */ }

const options = {method: fibonacci, custom: true, integer: true, size: 5000 }
```

An input array will not be generated, and will instead run `fibonacci(5000)`

To run multiple integers increasing in size, add the same property to the options argument using the `#run()` function - see [timing increasing input sizes](#timing-increasing-input-sizes)

### Calling a function with arguments

Use the Args property with an array, to call one or more arguments:

```js
const options = {method: [].unshift, args: [1] }
// will call array.push(1)

const options = {method: [].unshift, args: [1, 2, 3] }
// will call array.push(1, 2, 3)
```

### Timing increasing input sizes

`#run()` can be used to execute multiple inputs of increasing size.

It takes a method argument and a starting input size. It the method 20 times, increasing the input array size by a step of the input size each team.

Note - the method will run with 5 additional warm up inputs at the start, the size as the starting input size. This is to warm up the system and reduce spikes.

The number of runs and the number of warm ups can be specified.

property   | Description                                                               | Input type | default
-----------|---------------------------------------------------------------------------|------------|--------
`method`   | method you want to time                                                   | function   | None
`size`     | size of the initial input array                                           | Integer    | `1000`
`custom`   | specifies that method is not a native function                            | Boolean    | `false`
`args`     | arguments to call the method with                                         | array      | `[]`
`runs`     | number of times to execute the method under test                          | Integer    | `20`
`warmUp`   | number of warm up runs to execute                                         | Integer    | `5`
`Integer`  | set to true to call the method on the `size` integer, instead of an array | Boolean    | `false`

### Example Usage

```js
const codeTimer = new CodeTimer()

codeTimer.run(method: [].sort)
```

To specify a different number of runs, simply add it as a property:

```js
codeTimer.run(method: [].sort, runs: 5)
```

To run a custom function, add `custom: true` as a property:

```js
codeTimer.run(method: myFunction, runs: 5, custom: true)
```

To change the number of warm up runs:

```js
codeTimer.run(method: myFunction, warmUp: 10, custom: true)
```

Results are output to the console in the following format:

```
  #reverse() => Array Size: 2000000, Run Time: 2
  #reverse() => Array Size: 4000000, Run Time: 2
  #reverse() => Array Size: 6000000, Run Time: 3
  #reverse() => Array Size: 8000000, Run Time: 5
  #reverse() => Array Size: 10000000, Run Time: 6
  #reverse() => Array Size: 12000000, Run Time: 7
```

The data from the last run can be accessed through the properties:
* `codeTimer.method`
* `codeTimer.startTime`
* `codeTimer.arraySize`
* `codeTimer.stopTime`

and the runTime method: `codeTimer.runTime()`

## Development Dependencies

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

## Getting Started

* Clone this repository: `git clone git@github.com:AJ8GH/algo-timer.git`
* Navigate to project root and install dependencies: `cd algo-timer && npm i`

## Running Tests

```shell
npm test
```
