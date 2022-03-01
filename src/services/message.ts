import { Subject } from "rxjs";
enum MessageNames {
  SET_INPUT_ERROR = "SET_INPUT_ERROR",
  SETLOADING = "SETLOADING",
  AUTH_ERROR_EVENT = "AUTH_ERROR_EVENT",
}

interface BroadcastMessage {
  name: MessageNames;
  payload?: any;
}

const Subscriber = new Subject();
const MessageService = {
  send: function (msg: BroadcastMessage) {
    Subscriber.next(msg);
  },
};
export { MessageNames, MessageService, Subscriber };
