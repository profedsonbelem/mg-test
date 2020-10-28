import { CLIENT_STATUS } from "../../types/status";

export function statusToString(status: CLIENT_STATUS) {
  switch (status) {
    case CLIENT_STATUS.Active:
      return "active";
    case CLIENT_STATUS["Confirmed Cancelation"]:
      return "deactivated";
    case CLIENT_STATUS["Requested Cancelation"]:
      return "deactivationRequested";
    default:
      return "active";
  }
}
