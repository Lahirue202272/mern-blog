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
    }
}, { timestamps: true });

const User = momgoose.model('User', userSchema);

export default User;