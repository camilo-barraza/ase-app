# Aritst Search Engine Frontend

App contains Login View, Search View, Artist Detail View and Favorites View.
Login View doesn't require a username and password, clicking on the Sign In button is enough to load the Search View. Favorites View may be accessed by clicking on the user profile icon at the top navigation bar.

## Notes

- App should be tested on google chrome for consistent results.
- Backend should enable cross-Origin resource sharing (CORS) in order to prevent the following error while running the app:

Access to XMLHttpRequest at 'https://music.musicaudience.info/api/v1/music/genres?limit=30&q=' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

## Links

- App demo: https://www.loom.com/share/5ee1172be6364780b61534cc2f938a8b

- Deployed app: http://ase-app.surge.sh/

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
