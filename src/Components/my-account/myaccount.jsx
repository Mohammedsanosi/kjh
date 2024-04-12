import React, { useState } from "react";
import { getAuth, updateProfile, updatePassword,reauthenticateWithCredential , EmailAuthProvider} from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./myaccount.css"

const MyAccount = ({ CurrentUser }) => {
    const [displayName, setDisplayName] = useState(CurrentUser.displayName || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const auth = getAuth();

    const handleNameUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateProfile(auth.currentUser, { displayName: displayName });
            setMessage('Name updated successfully.');
        } catch (error) {
            setMessage('Failed to update name.');
        }
        setLoading(false);
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            setMessage('Password should be at least 6 characters.');
            return;
        }
        setLoading(true);
        const auth = getAuth();
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, currentPassword);

        try {
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            setMessage('Password updated successfully.');
            setNewPassword('');
            setCurrentPassword('');  // Clear password fields
        } catch (error) {
            if (error.code === 'auth/requires-recent-login') {
                setMessage('Please re-authenticate to update your password.');
            } else {
                setMessage('Failed to update password.');
            }
        }
        setLoading(false);
    };

    return (
        <div className="container mt-5">
            <h2 className="heading-my">Edit Profile</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleNameUpdate}>
            <div className="mb-3">
<label htmlFor="displayName" className="form-label">Name</label>
<input
    type="text"
    className="form-control-myaccount"
    id="displayName"
    value={displayName}
    onChange={(e) => setDisplayName(e.target.value)}
    disabled={loading}
/>
</div>
<button type="submit" className="btn-myacc btn-primary" disabled={loading}>Update Name</button>
            </form>
            <form onSubmit={handlePasswordUpdate}>
                <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                    <input
                        type="password"
                        className="form-control-myaccount"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control-myaccount"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength="6"
                        disabled={loading}
                    />
                </div>
                <button type="submit" className="btn-myacc btn-danger" disabled={loading}>Update Password</button>
            </form>
        </div>
    );
};

export default MyAccount;



 