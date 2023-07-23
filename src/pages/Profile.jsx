import {useContext} from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader';
const Profile = (data) => {

  const { isAuthenticated,isLoading,setIsLoading} = useContext(Context);
  if(!data)
  {
    setIsLoading(true)
  }
  else{
    setIsLoading(false);
  }
  if(!isAuthenticated) toast.error("Login First");
  return (
    isLoading? <Loader/>:
    <div className='container'>
      {!isAuthenticated && <Navigate to="/login" />}

      <h2>{data?.data.name}</h2>
      <h4>{data?.data.email}</h4>
      <h4>{new Date(data.data?.createdAt).toLocaleString()}</h4>
    </div>
  )
}

export default Profile
