/**
 * @openapi
 * 'api/v1/auth/jobseeker/signup':
 *  post:
 *      tags:
 *          -   Authentication
 *      summary: Signup user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/signupUser'
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 */

/**
 * @openapi
 * 'api/v1/auth/jobseeker/signin':
 *  post:
 *      tags:
 *          -   Authentication
 *      summary: Signin user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/signinUser'
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: Bad Request
 */
