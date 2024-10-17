import {model, Schema} from 'mongoose'

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        height: {
            type: Number,
            required: false,
        },
        age: {
            type: Number,
            required: false,
        },
        currentWeight: {
            type: Number,
            required: false
        },
        desiredWeight: {
            type: Number,
            required: false,
        },
        bloodType: {
            type: Number,
            required: false,
        },
        dailyCalorieIntake: {
            type: Number,
            required: false,
        },
        accessToken: {
            type: String,
            default: null,
        },
        refreshToken: {
            type: String,
            default: null,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            default: null,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    },
    {versionKey: false}
)

//MongoDB collection name = "users"
export const User = model('users', userSchema)
