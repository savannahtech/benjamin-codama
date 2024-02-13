// import { useState } from 'react'
import { Button, Input } from 'react-daisyui'
// import useAuthenticate from '../services/auth'
const Profile: React.FC = () =>{
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        
          <div className="card w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={()=>{}} className="card-body">
              <div className="form-control">
                {/* {error && ( */}
                  {/* <Alert
                    status="error"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    }
                  >
                  </Alert> */}
                {/* )} */}
    
                <label className="label">
                  <span className="label-text">
                    {/* {success ? 'SMS Code' : 'Phone Number'} */}
                  </span>
                </label>
                  <Input
                    type="string"
                    // value={phoneNumber}
                    // onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Name"
                    className="input input-bordered"
                    required
                  />

                 <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
                  
              </div>
              
              <div className="form-control mt-6" id="recaptcha-id">
                <Button type="submit" color="primary">
                  Save
                  {/* {loading && <Loading variant="dots" />} */}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )
}
export default Profile;