import { Express, Request, Response } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";

const option: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["**/**/*.swagger.ts", "**/**/*.schema.ts"],
};

const swaggerSpec = swaggerJsDoc(option);
function swaggerDocs(app: Express) {
  app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default swaggerDocs;
