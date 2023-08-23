import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"


function ChangePassword({id}){
    console.log('work',id)
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (currentPassword.length < 6 || newPassword.length < 6 || confirmNewPassword.length < 6) {
            setErr('Passwords should be at least 6 characters long.');
            return;
        }
        
        if (currentPassword === newPassword) {
            setErr('The new password cannot be the same as the current password.');
            return;
        }
        
        if (newPassword !== confirmNewPassword) {
            setErr('The new password and the confirmation password do not match.');
            return;
        }
        
        try {
            await axios.post('http://localhost:4000/chengepassword',{currentPassword, newPassword, confirmNewPassword, id})
            .then((res)=>{
                console.log(res);
                if (res.data.message ==='success'){
                    alert(res.data.message);
                    navigate(-1);
                    return;
                }
                alert(res.data.message);
            })
        } catch (error) {
            console.log(error);
        }
    }
    return(
       
        <div className=" flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                  <p className={`text-red-700 ${err ? '' : 'hidden'}`}>{err}</p>
                    <div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Change Password</button>
                    </div>
                </form>
                <button onClick={()=> navigate(-1)} className="bg-blue-500 mt-4 text-white px-4 py-2 rounded hover:bg-orange-800">Got Back</button>
            </div>
        </div>
    )
}

export default ChangePassword;