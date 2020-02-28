## Sections

## 2. Use Sequelize to build a REST API.

1. Create a new JavaScript file named `sequelize-rest.js`.
1. Install the dependency `sequelize@5.8.6`
1. In the JavaScript file, initialize the database connection with Sequelize.
1. Using Sequelize, define a model called `Movie` with the following properties (in addition to an ID):
   - `title` (text)
   - `yearOfRelease` (number)
   - `synopsis` (text)
1. Make sure the model is synched with the database upon startup.
1. Use the model `create()` method to insert 3 rows of example data. This logic should happen _after_ the model synchronization completes. The data should persist. Restarting the API should not cause any data to be lost.
1. Create an express app with routes that support the following RESTful actions on the "movies" resources.
   - _create_ a new movie resource
   - _read all_ movies (the collections resource)
   - _read_ a single movie resource
   - _update_ a single movie resource
   - _delete_ a single movie resource
     You don't need any special logic.
     A standard REST implementation is ok.
1. Make sure that your handlers send back `404` status codes when appropriate.
1. Implement pagination on the "read all" collections resource end-point.
   The user must be able to pass `limit` and `offset` as **query parameters** to correctly control what results they receive. You can access query parameters on the `req.query` object. Sequelize supports pagination through the `findAndCountAll` query method.
   The response should, in addition to the array of resources, also contain a number indicating how many results there are in _total_. So, it should look like this:
   javascript
   {
   data: [
   { ... },
   { ... },
   ...
   ],
   total: 12
   }
1. Make sure that all endpoints handle database errors in the promise chain. Errors should be handled by Express' built-in error handler.
