import { useAuthUser } from "react-auth-kit";
import { useEffect } from "react";
import axios from "axios";
import React, { useState } from "react";


export default function ProfilePage(){
  const auth = useAuthUser();
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/email/${auth().email}`);
        const data = response.data;
        setCurrentUser(data);
      

      } catch (err) {
        console.log(err);
      }
    };
  
    fetchCurrentUser();
    
  }, [auth().email]);
  console.log(currentUser);
    return (
        <section >
          <div className="container py-5 mt-5">
    
            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>

                    <h5 className="my-3">{currentUser?.name}</h5>
                    <p className="text-muted mb-1">{currentUser?.role}</p>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
                    <div className="d-flex justify-content-center mb-4">
                    </div>
                  </div>
                </div>
              </div>


              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">UserName</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{currentUser?.name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{currentUser?.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Phone</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{currentUser?.phoneNumber}</p>
                      </div>
                    </div>
                    </div>
                </div>
                <div className="row">
        
            <div className="d-grid gap-1 ">

            {/* buton cu verde pentru oferte active */}
                <a
                  className="btn btn-primary font-weight-bold  mx-2  "
                  aria-current="page"
                  href="/id/pending"
                >
                  Pending Offer
                </a>
               
                <a
                  className="btn btn-secondary font-weight-bold  mx-2  "
                  aria-current="page"
                  href="/id/completed"
                >
                 Completed Offer 
                </a>
              </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
}