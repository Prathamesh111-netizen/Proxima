import * as PushAPI from "@pushprotocol/restapi";

const fetchNotifs = async () => {
  const notifications = await PushAPI.user.getFeeds({
    user: "eip155:42:0xD8634C39BBFd4033c0d3289C4515275102423681", // user address in CAIP
    env: "staging",
  });

  return notifications;
};

module.exports = fetchNotifs;
