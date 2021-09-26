function User(name) {
  console.log(new.target);
  if (!new.target) {
    return new User(name);
  }
  this.name = name;
}

let result1 = User("john");
console.log(result1);
/*
undefined
[Function: User]
User { name: 'john' }
*/

let result2 = new User("john");
console.log(result2);
/*
[Function: User]
User { name: 'john' }
*/
