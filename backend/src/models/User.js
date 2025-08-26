import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

let userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return value
            .toString()
            .toLowerCase()
            .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        },
        message: 'Enter proper email!',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    nativeLanguage: {
      type: String,
      default: '',
    },
    learningLanguage: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (pwd, pwdDB) {
  return await bcrypt.compare(pwd, pwdDB);
};

export default model('User', userSchema);
