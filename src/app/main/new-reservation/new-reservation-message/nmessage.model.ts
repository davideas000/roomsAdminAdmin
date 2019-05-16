export enum RaNMessageMsgType {
  success = "success",
  error = "error",
  neterror = "net-error"
}

export enum RaNMessageType {
  error = "error",
  success = "success"
}

export class RaNMessage {
  type: RaNMessageType;
  show: boolean;
  msgType: RaNMessageMsgType;

  constructor() {
    this.type = RaNMessageType.error;
    this.show = false;
    this.msgType = RaNMessageMsgType.error;
  }
}
