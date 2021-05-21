algo-timer ⏱
=============

[![Build Status](https://travis-ci.com/AJ8GH/algo-timer.svg?branch=main)](https://travis-ci.com/AJ8GH/algo-timer) [![Maintainability](https://api.codeclimate.com/v1/badges/510048d893759d26f6d5/maintainability)](https://codeclimate.com/github/AJ8GH/algo-timer/maintainability) [![BCH compliance](https://bettercodehub.com/edge/badge/AJ8GH/algo-timer?branch=main)](https://bettercodehub.com/) [![codecov](https://codecov.io/gh/AJ8GH/algo-timer/branch/main/graph/badge.svg?token=KYZ9V6KT96)](https://codecov.io/gh/AJ8GH/algo-timer)

A flexible and easy to use code-timing framework.

[Available on NPM](https://www.npmjs.com/package/algo-timer)

## Usage

Add to your package as a development dependency:

```shell
npm i -D algo-timer
```

Import into your project:

```js
import AlgoTimer, { AlgoRunner } from 'algo-timer'
```

Ensure `type` is set to `module` in your `package.json`:

```json
// package.json
{
  "type": "module"
}
```

And you are ready to start timing some code.

### Timing a built in function

Using AlgoTimer `#time()` to Time the `array.sort()` method, on an array of 1000 elements.

```js
const algoTimer = new AlgoTimer()

const options = {method: [].sort, size: 1000}

algoTimer.time()
// runs the method and records the data
// returns the run time in ms

algoTimer.runTime()
// returns the run time in ms

algoTimer.printResults()
// prints the method, array size and run time
```

### Timing a custom function

Pass custom: true in the argument object to use AlgoTimer #time() to time a custom method.

```js
const algoTimer = new AlgoTimer()

const last = (array) => { return array[array.length -1] }

const options = {method: last, size: 1000, custom: true }
```

### Manual usage

Use `#start()` and `#finish()` manually to time any code.

```js
algoTimer = new AlgoTimer()

algoTimer.start()
// code you want to time
algoTimer.finish()

algoTimer.runTime()
// run time of your code in ms
```

### Using AlgoRunner

AlgoRunner can be used to measure the run time of algorithms for increasing input sizes, to track algorithmic complexity.

`#run()` takes a method argument and a starting input size. It the method 20 times, increasing the input array size by a step of the input size each team.

Note - the method will run with 4 additional control inputs at the start, with sizes of 0.25, 0.5, 0.75 and 1 * the starting input size. This is to 'warm up the system' and reduce the effect of any initial spike which could bias results.

e.g. the below code will run the sort method for 4 control runs, with arrays of length: 250, 500, 750, 1000

Then will run 20 runs, with array sizes of: 1,000 to 20,000, incrementing by 1,000 each time.

```js
const algoRunner = new AlgoRunner()

algoRunner.run(method: [].sort, size: 1000)
```

To specify a different number of runs, simply add it as a property:

```js
algoRunner.run(method: [].sort, size: 1000, runs: 5)
```

To run a custom function, add `custom: true as a property`:

```js
algoRunner.run(method: myFunction, size: 1000, runs: 5, custom: true)
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

The data from the last run can be accessed through `AlgoRunner.algoTimer`

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
