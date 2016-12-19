Note: This is still under development.

# vue-props-template

Write vue's props through template literal.

```javascript
const pt = require('vue-props-template')
const UserItem = {
  template: '<li>{{name}} is {{age}} years old.</li>',
  props: pt`
    required string name = ${'Anonymous'}
    number age
  `
}
```

## About Props

Check the original documents.

 - [Components - vue.js &gt; Props](https://vuejs.org/v2/guide/components.html#Props)

## Installation

```bash
$ npm install -S https://ginpei.github.io/vue-props-template/
```

```javascript
const pt = require('vue-props-template')
```

`pt` or whatever you want.

## Usage

### Basic Types

```javascript
const MyComponent = {
  props: pt`
    string simpleString
    number simpleNumber
    boolean simpleBoolean
    function simpleFunction
    object simpleObject
    array simpleArray
  `
}
```

It makes:

```javascript
const MyComponent = {
  props: {
    simpleString: { type: String },
    simpleNumber: { type: Number },
    simpleBoolean: { type: Boolean },
    simpleFunction: { type: Function },
    simpleObject: { type: Object },
    simpleArray: { type: Array }
  }
}
```

### Required

```javascript
const MyComponent = {
  props: pt`
    required string requiredProp
  `
}
```

It makes:

```javascript
const MyComponent = {
  props: {
    requiredProp: { type: String, required: true }
  }
}
```

### Default

You need to use interporations.

```javascript
const MyComponent = {
  props: pt`
    string defaultString = ${'foo-bar'}
    array defaultArray = ${[11, 22, 33]}
  `
}
```

It makes:

```javascript
const MyComponent = {
  props: {
    defaultString: { type: String, defualt: 'foo-bar' },
    defaultArray: { type: Array, default: [11, 22, 33] }
  }
}
```

Values inside template string, e.g. `string foo = 123`, don't work.

### Validator

You need to use `extend()`. Ewww.

```javascript
props = pt.extend(pt`
  string extendedString
`, {
  extendedString: {
    validator: function (value) {
      return value.startsWith('ok-')
    },
    whatever: 'whatever'
  }
})
```

It makes:

```javascript
props = {
  extendedString: {
    type: String,
    validator: function (value) {
      return value.startsWith('ok-')
    },
    whatever: 'whatever'
  }
}
```

This syntax may be changed...


## History

- Not released yet.

## License

- MIT License

## Contact

- by Ginpei
- GitHub: [ginpei/vue-props-template](https://github.com/ginpei/vue-props-template)
- Twitter: [@ginpei\_en &#x1F1E8;&#x1F1E6;](https://twitter.com/ginpei_en) or [@ginpei\_jp &#x1F1EF;&#x1F1F5;](https://twitter.com/ginpei_jp)
