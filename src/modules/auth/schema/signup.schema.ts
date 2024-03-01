/**
 * @openapi
 * components:
 *  schemas:
 *      signupUser:
 *          type: object
 *          required:
 *              -   email
 *              -   phone
 *              -   password
 *          properties:
 *              email:
 *                  type: string
 *                  default: example@example.com
 *              phone:
 *                  type: number
 *                  default: 0123456789
 *              password:
 *                  type: string
 *                  default: Password1234@
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      signinUser:
 *          type: object
 *          required:
 *              -   email
 *              -   password
 *          properties:
 *              email:
 *                  type: string
 *                  default: example@example.com
 *              password:
 *                  type: string
 *                  default: Password1234@
 */
