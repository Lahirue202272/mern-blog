import momgoose from 'mongoose';

const userSchema = new momgoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true 
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU0a0iDtUPUzs0GFM6DSuovK0uOE4-Sc40Pg&s",
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const User = momgoose.model('User', userSchema);

export default User;