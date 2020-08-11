export class User {
  id: string;
  name: string;
  room: string;

  constructor(name: string, room?: string, id?: string) {
    this.id = id;
    this.name = name;
    this.room = room;
  }
}
