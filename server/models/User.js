const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  ip: {
    type:String,
    required: true,
  },
   deviceInfo: { 
    type: Object ,
    unqiue: true,
   },
   activity: [
    { 
      type: Object,
      required: true,
      unique: false,
    },
   ],
});

UserSchema.methods.addAcitivity = function(activity) {
  const date = new Date();
  let ISToffSet = 330;
  let offset = ISToffSet * 60 * 1000;
  let ISTTime = new Date(date.getTime() + offset);
  const updateActivity = [...this.activity];
  updateActivity.push({...activity , dateIST: ISTTime});
   this.activity = updateActivity;
    return this.save();
}

module.exports = mongoose.model("User_IP" , UserSchema);

