# Keskkonna seadistamine

Kui tekib viga "Invalid options object. Dev Server has been initialized using an options object that does not match the API schema", loo `client` kaustas fail `.env` järgmise sisuga:

```
DANGEROUSLY_DISABLE_HOST_CHECK=true
WDS_SOCKET_HOST=localhost
WDS_SOCKET_PORT=3000
```

See fail lahendab webpack-dev-serveri konfiguratsiooni vea.
