import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone:{
    type:Number,
    required:true
  },
  uniqueId: {
    type: String,
    default: () => nanoid(6), // Use nanoid(6) as the default value
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },
});

const User=mongoose.model('User',userSchema);

export default User;
// The schema is defined in the file above. The schema is then exported to be used in the main file. The schema is defined as follows:
// name: This field is of type String and is required.
// email: This field is of type String and is required.
// password: This field is of type String and is required.
// The schema is defined using the mongoose.Schema() method, which creates a new schema object. The schema is then exported using the module.exports statement so that it can be imported and used in the main file.