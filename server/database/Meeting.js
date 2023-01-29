const astraClient = require("./db.js");
const { v4 : uuidV4} = require('uuid')

const MeetingsCollection = astraClient
  .namespace(process.env.ASTRA_DB_KEYSPACE)
  .collection("Meetings");

const createMeeting = async (meeting) => {
  // create a new user (specifying documentId)
  const meetingId = uuidV4()
  const newMeeting = await MeetingsCollection.create(meetingId, meeting);
  return newMeeting;
};

export default {
    createMeeting
}
