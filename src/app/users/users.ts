export class Users {
  username: string;
  name: string;
  password: string;

  users: object[];

  constructor() {
    this.users = [];
  }

getUsers() {
  return this.users;
}
}


/*export const USERS = [
  { id: 'skalaim', name: 'Sathish Kalaimani', password: 'kings'},
]*/
