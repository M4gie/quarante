/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.resource('themes', 'ThemesController')
  .apiOnly()
  .middleware({ store: 'auth', update: 'auth', destroy: 'auth' });

Route.resource('roundTypes', 'RoundTypesController')
  .apiOnly()
  .middleware({ store: 'auth', update: 'auth', destroy: 'auth' });

Route.resource('rounds', 'RoundsController')
  .apiOnly()
  .middleware({ store: 'auth', update: 'auth', destroy: 'auth' });

Route.resource('games', 'GamesController')
  .apiOnly()
  .middleware({ store: 'auth', update: 'auth', destroy: 'auth' });

Route.resource('gameTypes', 'GameTypesController')
  .apiOnly()
  .middleware({ store: 'auth', update: 'auth', destroy: 'auth' });

Route.post('rounds/random', 'RoundsController.random');
