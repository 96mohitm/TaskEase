import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth'


declare const google: any;

const loadScript = (src: any) =>
  new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.body.appendChild(script)
  })

interface GoogleAuthProps {
    setLoading: (loading: boolean) => void;
}
  
const GoogleAuth: React.FC<GoogleAuthProps> = ({ setLoading }) => {
  const { login } = useAuth();
  const googleButton = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const src = 'https://accounts.google.com/gsi/client'
    const id = "1028718450193-8lktn7b6pu5ilhdi7qnrc9u4s3quhb17.apps.googleusercontent.com"

    loadScript(src)
      .then(() => {
      
        /*global google*/

        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        })
        google.accounts.id.renderButton(
          googleButton.current,
          { theme: 'outline', size: 'large' }
        )
      })
      .catch(console.error)

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`)
      if (scriptTag) document.body.removeChild(scriptTag)
    }
  }, [])

  function handleCredentialResponse(response: any) {
    if (response.credential) {
      var data = { "auth_token": response.credential }
      setLoading(true);
      axios.post("/api/users/google/", data, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .then((response) => {
        const res = response.data;
        if (response.status === 200) {
          navigate('/');
          login();
          localStorage.setItem('profile_picture', res?.profile_picture);
        }
        // document.getElementById("email_id").innerText = res['email'];
        // document.getElementById("auth_token").innerText = res['tokens'];
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      })
      .finally (()=> {
        setLoading(false);
      });

    }
  }

  return (
    <div id='google-login-btn' className='flex justify-center'>
      <div ref={googleButton} id='google-ref' ></div>
    </div>
  )
}

export default GoogleAuth;