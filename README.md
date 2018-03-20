# Babel transpile explanation

## Why ?
Because it's not easy to understand the job of Babel.

So, Babel is a library that allows to transpile your Javascript code into another one. You have to do this when your target client is not compatible with the code you wrote.

Hey man, why are you writing code incompatible ?
Just because new features from Ecmascript standard (the rule which JS is built over) will make my life easier:
 * Array.forEach is better than a for loop
 * let / const scoping is a great improvements in JS syntax
 * `Hello ${firstname}, or maybe should i call call M. ${lastname} ${firstname}` is better than the + concatenation 
 * ...
 
ES6 (also called ES2015), and ES7/8 bring a lot of improvements. But, browsers or V8 engine inside Node server may not be compliant.
That's why Babel exists !

## How ?
Babel has a cli that allows to run babel scripts. You just have to specify the file input, the file output, and the preset.

Hey man, what are the preset ?
Preset are just a set of configuration that you want to polyfills. If you use es2017 feature, you may needs them but not es2018.
It allows to prevent the build of huge files.

You also have to define your targets: you can set a list of browser per example.

## WTF, my require/import make babel fail!
Yes indeed i also faced a lot of problems. The transpilation system is usually setup at the beginning of a project. You are not an expert of this process, and it's normal. So you may have a lot of problems, even with the good Babel documentation.
For example when you try to transpile JS code with `require ('a lib')` then the transpiled code still have this require string whereas you would like to get the full code from file `a lib`. This is because
this is not the Job of Babel. Babel will just transpile the code into the target preset, but it won't resolve the dependancies.
In fact, i didn't found a solution from Babel about it. So i looked for Bundler or Old task manager. Historically, Grunt or Gulp had plugins to resolve this, but now you are certainly using Webpack, and it's its own Job to bundle files.

There is 2 strategies:
* one big file
* split files into chunk based on import

For the first one, you must not use `import ('a lib')` but `require ('a lib')`.
For the second one you will need plugin *babel-plugin-syntax-dynamic-import* then `import ('a lib')` will run.

## WTF, i still cannot do Array.forEach!
Argh, yes indeed it seems that Babel just transpile from ES2015 standard. But [].forEach is a feature available in ES5, so... Even if i saw [a pull request](https://github.com/babel/babel/pull/6526) i did'nt found the way to make it run natively.
So after some research i decided to look at core-je library. I thought that babel was based on it, but i might be wrong.

Now you just have to import all specific shim from ES5 that are missing for your targets (hey, aren't you trying to build an app for IE9 ?) like this:

```
// Don't use dynamic import to get Promise available immediatly
require ('core-js/modules/es6.promise')

// dynamic import from babel
import ('babel-polyfill')

// dynamic import for all required shim and polyfills from core-js
import ('core-js/modules/es6.array.for-each.js')

console.log('start')

const list = [1, 2, 3, 4]
list.forEach(val => console.log(val))

console.log('end')
```

I'm not an expert, just a devloper that tryed to understand Babel. I'm sure i missed a lot of thing. I just know that all this works, but maybe we could do a lot better.
Tell me how to improve this :-)

Here are some sources that helped me to understand some concepts: https://hackernoon.com/polyfills-everything-you-ever-wanted-to-know-or-maybe-a-bit-less-7c8de164e423#---236-244