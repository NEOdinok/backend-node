const inData =
  "user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue";

function queryObjectify(arg) {}

queryObjectify(inData);
/* Результат: из строки нужно получить объект
{
  'user': {
    'name': {
      'firstname': 'Bob',
      'lastname': 'Smith'
    },
    'favoritecolor': 'Light Blue'
  }
};
*/
