const Logs = require("../models/log")

const addDataToLogs = async (activityType, onActivityId, note = "", form = "", url = "", chat = "") => {
    const newLog = new Logs({
        activityType,
        onActivityId,
        note, form, chat
    });

    await newLog.save();
}

module.exports = {addDataToLogs}