import mongoose from 'mongoose';
const { Schema } = mongoose;

const carSchema = new Schema({
  model: {
    type: String,
    minlength: 3,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        // Simple regex to check if the phone number has exactly 11 digits
        return /^\d{11}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
    required: true,
  },
  maxPictures: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  pictures: [
    {
      type: String, // Assuming you're storing picture URLs
    },
  ],
  owner:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }
});

const Car = mongoose.model('Car', carSchema);

export default Car;