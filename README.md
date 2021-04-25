# axios-template-literal

## Install

```shell
npm install axios-template-literal
yarn add axios-template-literal
```

## Usage

```typescript
const Axios = require("axios");
const createAxiosTemplateLiteral = require("axios-template-literal");

/**
 * Create you default axios instance
 */
const instance = Axios.create({
  baseURL: "https://gorest.co.in/public-api/",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

/**
 * Pass axios instance to axiosTemplateLiteral function
 */
const axios = createAxiosTemplateLiteral(instance);

/**
 * Make your request!
 */
axios`
  GET /users
  Another-One-Header: With some custom value you want

  ${JSON.stringify({ page: 5 })}
`.then((res) => console.log(res));

/**
 * Or you can do it like that, predefining the request method
 */

axios.get`
  /users
  Another-One-Header: With some custom value you want

  { "page": 5 }
`.then((res) => console.log(res));

/**
 * For the typescript support you can pass return type of request promise
 */

type YouCustomType = string;
axios<YouCustomType>`
  GET /users

  ${JSON.stringify({ page: 5 })}
`.then((res) => console.log(res));

axios.get<YouCustomType>`
  GET /users

  ${JSON.stringify({ page: 5 })}
`.then((res) => console.log(res));
```

## Acknowledgement

This library was inspired by [http-template-literal](https://github.com/pfrazee/http-template-literal) by [@pfrazee](https://github.com/pfrazee).

## License

Licensed under the MIT License. Check the [LICENSE](https://github.com/shtelzerartem/axios-template-literal/blob/master/LICENSE) file for details.
