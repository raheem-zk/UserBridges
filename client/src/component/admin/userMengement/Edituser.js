import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { UpdateUserData } from "../../../Redux/usersSlice";
import ChangePassword from "../../user/ChangePassword";
import useAdminIsLogin from "../../../customHook/admin/adminIsLogin";
import { UpdateData } from "../../../Redux/userAuth";


function UserProfileEditPage({ IsLogin }) {
  IsLogin();

  const { id } = useParams()
  console.log(id);
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth)
  // const userData = users.length !== 0 ? users.find((item) => item?._id === id) : user;
  const userData = user?._id === id ? user : users.find((item) => item?._id === id);

  const [username, setUsername] = useState(userData?.username);
  const [email, setEmail] = useState(userData?.email);
  const [phone, setPhone] = useState(userData?.phone);
  const [image, setImage] = useState(null);
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chengepassword, setChengepassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === '' || email === '' || phone === '') {
      setErr('plese fill the fieald')
      return;
    }
    // if (phone.length != 10) {
    //   setErr('Plese enter curect phone number');
    //   return;
    // }
    if (phone.toString().length !== 10) {
      setErr('Please enter a correct phone number');
      return;
    }
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('image', !image ? userData?.image : image);
    formData.append('id', userData._id);
    try {
      await axios.post('http://localhost:4000/userprofileedit', formData)
        .then((result) => {
          console.log(result);
          if (result.data.message === 'success') {
            dispatch(UpdateData({ username, email, phone, image: result.data.image }))
            dispatch(UpdateUserData({ username, email, phone, image: result.data.image, id: userData._id }))
            navigate(-1);
            return;
          }
          alert(result.data.message);
        })
        .catch((error) => {
          console.log(error);
        })
    } catch (error) {
      console.log(error);
    }
  }
  return chengepassword ? <ChangePassword id={userData._id} /> : (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block font-semibold mb-2">
                Phone
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              {image ? (
                <img className="w-20 h-20 rounded-full" src={URL.createObjectURL(image)} alt="posts" />
              ) : (
                <img className="w-20 h-20 rounded-full" src={'http://localhost:4000/images/' + userData?.image} alt="posts" />
              )}
              <input type="file" className="py-5" onChange={(e) => setImage(e.target?.files[0])} />
            </div>
            <p className={`text-red-700 ${err ? '' : 'hidden'}`}>{err}</p>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
          <button onClick={() => setChengepassword(!chengepassword)}
            className="px-4 mt-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600"
          >
            Edit Password
          </button>

        </div>
      </main>
    </div>
  );

}

export default UserProfileEditPage;