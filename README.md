# choo-app-starter

# diagram

Top level overview
![proxy diagram](/proxydiagram.png)

The mechanics of SPA - essentially serving `index.html` for any file not found, then allowing the FE JS router
look at window.location to determine how it should render that result.
Hopefully the picture below clarifies this step. 
![SPA-FE](/SPA-FE.png)


# setup (dev)

Run the following in separate terminals

```
    npm run start-spa
    npm run start-proxy
    npm run start-backend
    npm run watch
```

Point your browser to http://127.0.0.1:8080 (Proxy)
