

# The lite node restful api framework





### Files description



```
node-project
├── package.json
├── index.js 
├── app
│   ├── config
│   |   └── config_dev.js or config_prod.js
│   ├── controller
│   |   └── home.js
│   ├── init
│   |   └── init.js
│   ├── last
│   |   └── init.js
│   ├── middleware
│   |   └── response_time.js
│   ├── model
│   |   └── xxx.js
|   ├── router.js
|   ├── error_handler.js (default error handler)
```



### config

`npm run dev` attached `config_dev.js`

`npm run prod` attached `config_dev.js`



### controller

Place concrete implementation of the restful



### init && last

You can inject the initialization object into the app



