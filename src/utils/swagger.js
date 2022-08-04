exports.options = {
  routePrefix: "/doc",
  exposeRoute: true,
  openapi: {
    // openapi: "3.0.0",
    info: {
      title: "Api Tienda",
      description: "Swagger API",
      version: "1.0.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: "https://rec.netbot.ec/v1",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    components: {
      securitySchemes: {
        basicAuth: {
          type: 'http' || 'https',
          scheme: 'basic'
        }
      }
    },
    security: [{
      basicAuth: []
    }]
    // securityDefinitions: {
    //   basicAuth: {
    //     type: 'basic',
    //   },
    // },
  },

};