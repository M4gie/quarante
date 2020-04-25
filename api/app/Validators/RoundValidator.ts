import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class RoundValidator {
  constructor(private ctx: HttpContextContract) {}

  /**
   * Defining a schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ inTable: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    data: schema.string({ trim: true }, [rules.maxLength(500), rules.minLength(2)]),
    answer: schema.string({ trim: true }, [rules.maxLength(80), rules.minLength(2)]),
    round_type_id: schema.number(),
    theme_id: schema.number(),
  });

  /**
   * The `schema` first gets compiled to a reusable function and then that compiled
   * function validates the data at runtime.
   *
   * Since, compiling the schema is an expensive operation, you must always cache it by
   * defining a unique cache key. The simplest way is to use the current request route
   * key, which is a combination of the route pattern and HTTP method.
   */
  public cacheKey = this.ctx.routeKey;

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   */
  public messages = {
    'data.required': 'Provide round data',
    'data.maxLength': 'Round data should not be more than 500 characters.',
    'data.minLength': 'Round data should not be less than 2 characters.',
    'answer.required': 'Provide round answer',
    'answer.maxLength': 'Round data should not be more than 80 characters.',
    'answer.minLength': 'Round data should not be less than 2 characters.',
    'round_type_id.required': 'Provide data type.',
    'theme_id.required': 'Provide theme.',
  };
}
