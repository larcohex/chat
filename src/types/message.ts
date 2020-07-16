import User from "./user";

export default class Message {
  from!: User;
  to!: User;
  text!: string;
}
