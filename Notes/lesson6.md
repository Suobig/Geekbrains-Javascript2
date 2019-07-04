# Компоненты Vue.js

В приложении, написанном в одном файле, сложно разбираться. Кроме того, разные части приложения могут непредсказуемо взаимодействовать. Для того. чтобы приложение было проще расширять, его делят на части.

## Создание компонентов

Задание нового компонента:

```javascript
Vue.component('name', {});
```

`'name'` - название компонента может быть любим, принято разделять имена из нескольких слов дефисом: `'some-name'`.

Главный параметр помпонента - template, html-размертка:

```javascript
Vue.component('vue-component', {
    template: `<h1>Hi!</h1>`
});
```

После этого можно использовать компонент как элемент html-разметки:

```html
<div id="app">
    <vue-component></vue-component>
</div>
```

Можно использовать один компонент внутри другого:

```javascript
Vue.component('another-component', {
    template: `<h1>Hi!</h1>`
});

Vue.component('some-component', {
    template: `<another-component></another-component>`
});
```

В компонентах данные хранятся в поле `data`, но здесь это не объект, а функция, возвращающая объект:

```javascript
Vue.component('some-component', {
    template: `<h1>{{ name }}</h1>`,
    data() {
        return {
            name: 'Frodo'
        }
    }
})
```

Шаблон может содержать только один внешний элемент, т.е. вот так написать нельзя:

```javascript
Vue.component('wrong-component', {
    template: `
    <h1>Hello...</h1>
    <h1>World!</h1>
    `
})
```

В таком случае Vue не сможет корректно подставить компонент. В таком случае понадобится `div` обертка.

Данные можно передавать не только через поле data, но и через html, используя поле `props`. Например:

```javascript
Vue.component('v-hobbit', {
    props: ['name'],
    template: `<p>Hello, I'm a hobbit! My name is {{ name }}`
})
```

```html
<div id="app">
    <v-hobbit name="Frodo Baggins"></v-hobbit>
</div>
```

В свойство можно пробросить не только конкретное значение, но и значение переменной из root компонента, через bind. Например, с таким root компонентом:

```javascript
const app = new Vue({
    el: "#app",
    data: {
        name: "Frodo Baggins",
    }
})
```

Мы можем написать так:

```html
<div id="app">
    <v-hobbit :name="name"></v-hobbit>
</div>
```
