# lang_detect
This application uses Koa running on Node as the backend and React as the frontend.

The language detection is done via `langdetect`: (https://www.npmjs.com/package/langdetect) which was a Google Code project (https://code.google.com/archive/p/language-detection/)

### Usage
The **backend** API expects and responds with **JSON** payloads. There are two methods available via REST calls:

`/api/languages` A GET method that will return all supported languages as an array of strings.

`/api/detect` A POST method that expects a body with an an object containing the key "text" and the text to be translated, eg.  `{"text": "Reich mir die Hand"}`.
A result will be returned, eg. `{"text":"Reich mir die Hand","language":"German","confidence":0.999994680276487}`

There is some basic error handling for an incorrect/missing body, missing text or text too large. An object will be returned containing the error eg. `{"error": "Please supply a correct JSON payload"}`

The **frontend** allows for quick visual testing of the API.

### Development

Start the backend in development mode `npm run dev` or production mode `npm start`.

Start the frontend with `npm start`.

Configure environment variables in `.env`

Building the frontend with `npm run build` will place the output in a **'build'** folder in the backend folder. To view the application, start the backend in production mode which will trigger `NODE_ENVIRONMENT=production` and serve the frontend statically.
