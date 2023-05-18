

const apiUser = {
  tags: 'user',
  get: {
      parameters: [
          {
              name: "token",
              in: "header",
              description: "token to be passed as a header",
              "required": true,
              example: "Bearer eyJhbGciOiJIUzI1NiIsInR5c..."
          },
          {
              name: "news",
              description: "count of news",
              in: "query",
              type: "number",
              required: false,
              example: "10"
          },
      ],
      responses: {
          200: {
              description: "array with objectes about news",
              schema: {
                  type: "array", items:
                  {
                      type: "object", properties: {
                          operation_date: { type: "string", format: "date-time" },
                          id: { type: "number" },
                          title: { type: "string" },
                          data: { type: "string" },
                      },
                  },
              },
          },
      },

      400: {
          description: "error response",
          type: "object",
          properties: {
              error: { type: "string" },
              message: { type: "string" },
          }
      },
      401: {
          description: "Unauthorized",
          type: "object",
          properties: {
              error: { type: "string" },
              message: { type: "string" },
          }
      },
      500: {
          description: "unknown error",
          type: "object",
          properties: {
              error: { type: "string" },
              message: { type: "string" },
          }
      }
  }
};

export const swaggerSchema = {
  schema: {
      swagger: "2.0",
      //openapi: "3.0.0",        
      info: {
          tags: ['products'],
          description: "endpoints for get all data",
      },
      paths: {
          "/api/user": apiUser,
      }
  },
  
}