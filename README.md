[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
# gum-auth-express
## 职责
1. 对通过认证的用户进行资源的鉴权

## 功能
同上

## Install
```
npm install gum-auth-express --save
```

## Usage
```
// 基本使用
const gumAuth = require("gum-auth-express");
const express = require("express");

const authValidate = gumAuth({ gumServerUrl: "gum-svc服务地址" });  //鉴权接口地址

// 如果要排除，则如下使用
// 使用express-unless，其他更多排除用法请看 https://www.npmjs.com/package/express-unless#examples
const authValidate = gumAuth({ gumServerUrl: "gum-svc服务地址" }).unless({ path: ["/api/v1/user/create"] });   //需要排除的路径  

const app = express();
app.use(authValidate);

```

### TODO 
- [ ] 增加应用key+secret 鉴权参数

