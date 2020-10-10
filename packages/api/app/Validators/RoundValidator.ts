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
    theme_id: schema.number(),
    description: schema.string({ trim: true }, [rules.maxLength(200), rules.minLength(10)]),
    /* file: schema.file({
      size: '1mb',
      extnames: ['mp3'],
    }), */
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
    'answers.required': 'Réponse manquante',
    'answers.maxLength': 'La reponse ne doit pas faire plus de 80 caractères.',
    'answers.minLength': 'La réponse doit faire au moins 1 caractère.',
    'theme_id.required': 'Thème manquant',
    'file.extname': 'Le fichier audio doit être au format .mp3',
    'file.size': 'Le fichier audio ne doit pas faire plus de 1mb',
    'file.required': 'Un fichier audio est requis',
    'description.maxLength': 'La description doit faire moins de 200 caractères',
    'description.minLength': 'La description doit faire plus de 10 caractères',
    'description.required': 'La description est manquante',
  };
}
