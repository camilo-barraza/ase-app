# React Shyft webapp

Web app with navigation bar and iframes displaying angular pages

## Running the app

Requires environment variables with angular app url and API urls

    cp .env.example .env
    yarn install
    yarn start

Angular app should be running on a separate server (using connect-webapp branch) before loading the react app.
## Deployment

App may be deployed on services like netlify by specifying [environment variables](.env.example):

    REACT_APP_ANGULAR_APP_URL=
    REACT_APP_API_HOST=
    REACT_APP_TIME_SERIES_API=
    REACT_APP_SOCKET_SERVER_URL=

Requires `yarn build` for generating */public* folder. Server should work based on content available in generated */public* folder.

## Communication between angular and react app 

React app contains iframes with angular pages. Apps may [communicate using window.postMessage](https://medium.com/@m.biomee/micro-fronends-spotify-approach-iframes-part-2-bb15c14449bf).

### Example of react app sending messages to angular app:

    iframe.contentWindow.postMessage(
      JSON.stringify({
        action: 'logout',
        data: 'some data'
      }),
      AngularAppUrl,
    );
### Example of angular app sending messages to react app:

    window.parent.postMessage(JSON.stringify({
      action: 'visit-site', 
      data: itemId
    }), reactAppUrl)

### Example of receiving messages on angular or react app:

    window.addEventListener('message', (evt) => {
      if (evt.origin !== 'http://localhost:3000') return;
      const { action, data } = JSON.parse(evt.data);
      if (action === 'logout')
        localStorage.clear()
    });

## Styling

Handled with [styled components](https://styled-components.com/)

## API calls

API calls are handled by request and response axios interceptors defined in [**src/config/axios/index.ts**](src/config/axios/index.ts). Interceptors contain logic related to caching with localstorage and error handling using [**src/config/axios/error-handler.ts**](src/config/axios/error-handler.ts).

### API call Examples

    Axios.post('/v1/admins/data', { body }, { toApi: true }))
    Axios.get('/v1/admins/data, { toApi: true })

Adding `{ toApi: true }` as a param for AxiosRequestConfig will preprend the API url to the request.

### Options for caching with axios

Adding `{ cache: true }` will save the **API response** during a day (default TTL) on localstorage and avoid using the network while the **API response** is available on localstorage. 

    axios.get(path, { toApi: true, cache: true })

Specifying TTL for cache based on data saved on localstorage: 

    axios.get(path, { toApi: true, cache: true, ttl: 60000 })

Getting updated value from API: 

Adding `{ refresh: true }` will ignore values saved on localstorage and use the network to get a response from the server.
    
    axios.get(path, { toApi: true, cache: true, refresh: reload })
