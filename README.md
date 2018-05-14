# lang_detect
This application uses Koa running on Node as the backend and React as the frontend.

The backend API expects and responds with **JSON** payloads. There are two methods available via REST calls:

`/api/languages` A GET method that will return all supported languages as an array of strings.

`/api/detect` A POST method that expects a body with an an object containing the key "text" and the text to be translated, eg.  `{"text": "Reich mir die Hand"}`.
A result will be returned, eg. `{"text":"Reich mir die Hand","language":"German","confidence":0.999994680276487}`

There is some basic error handling for an incorrect/missing body, missing text or text too large. An object will be returned containing the error eg. `{"error": "Please supply a correct JSON payload"}`
