import * as Ping from "./ping";
import * as User from "./user";

export const getCommands = () => {
  return [...Ping.default, ...User.default];
};
