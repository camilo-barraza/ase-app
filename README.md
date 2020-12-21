# Aritst Search Engine Frontend

## Running the app

Requires environment variables with user token and api url

    cp .env.example .env
    yarn install
    yarn start

## Deployment

App may be deployed by specifying [environment variables](.env.example):

    REACT_APP_API_HOST=
    REACT_APP_USER_TOKEN=

Requires `yarn build` for generating _/build_ folder. Server should work based on content available in generated _/build_ folder.

## Styling

Handled with [styled components](https://styled-components.com/)

## API calls

API calls are handled by request and response axios interceptors defined in [**src/config/axios/index.ts**](src/config/axios/index.ts). Interceptors contain logic related to caching with localstorage and error handling using [**src/config/axios/error-handler.ts**](src/config/axios/error-handler.ts).

### API call Examples

    Axios.post('/v1/admins/data', { body }, { toApi: true }))
    Axios.get('/v1/admins/data, { toApi: true })

Adding `{ toApi: true }` as a param for AxiosRequestConfig will preprend the API url to the request.
