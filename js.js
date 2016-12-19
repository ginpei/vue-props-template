'use strict'

const UserItem = {
  template: '<li>{{name}} is {{age}} years old.</li>',
  props: vuePropsTemplate`
    string name
    number age
  `
}

const App = {
  template: `
    <ul>
      <user-item v-for="u in users" :name="u.name" :age="u.age"></user-item>
    </ul>
  `,
  components: { UserItem },
  data: function () {
    return {
      users: [
        { name: 'Alice', age: 11 },
        { name: 'Bob', age: 22 },
        { name: 'Charlie', age: 'thirty-three' }
      ]
    }
  }
}

new Vue({
  el: '#app',
  render: function (createElement) {
    return createElement(App)
  }
})
