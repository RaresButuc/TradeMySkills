import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useParams, useNavigate } from "react-router-dom";

import Alert from "../components/Alert";
import DefaultURL from "../GlobalVariables";
import ProfilePhoto from "../shared/ProfilePhoto";

export default function RejectedWorkersPage() {
  const { id } = useParams();
  const token = useAuthHeader();
  console.log(token());
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertInfos, setAlertInfos] = useState(["", ""]);
  const [currentAdTitle, setCurrentAdTitle] = useState(null);
  const [rejectedWorkers, setRejectedWorkers] = useState(null);
  const [deletedWorkerName, setDeletedWorkerName] = useState(null);

  useEffect(() => {
    const getRejectedWorkers = async () => {
      const headers = { Authorization: token() };

      try {
        const response = await axios.get(
          `${DefaultURL}/ads/rejected/workers/${id}`,

          { headers }
        );
        const data = response.data;
        setRejectedWorkers(data);
      } catch (err) {
        navigate("/err");
      }
    };

    const getAdById = async () => {
      try {
        const response = await axios.get(`${DefaultURL}/ads/${id}`);
        setCurrentAdTitle(response.data.title);
      } catch (err) {
        navigate("err");
      }
    };

    getAdById();
    getRejectedWorkers();
  }, [deletedWorkerName, token()]);

  const deleteRejectedWorkerButton = async (idOfAd, worker) => {
    try {
      await axios.post(`${DefaultURL}/mail/send/${worker.email}`, {
        subject: "Good news",
        message: `Hello ${worker.name}! The owner of the ad ${currentAdTitle} gave you permission to apply again any time.`,
      });
      const response = await axios.put(
        `${DefaultURL}/ads/rejected/remove/${idOfAd}/${worker.name}`,
        {}
      );
      setDeletedWorkerName(worker.name);

      setShowAlert(true);
      setAlertInfos(["success", response.data]);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (err) {
      setShowAlert(true);
      setAlertInfos(["danger", err.response.data.message]);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <>
      {showAlert && <Alert type={alertInfos[0]} message={alertInfos[1]} />}

      <div className="container-fluid" style={{ marginTop: 110 }}>
        <h1 className="fw-bold mb-5">
          Ad #{id} ("{currentAdTitle}") Rejected Workers
        </h1>
        <div className="row">
          {rejectedWorkers?.map((worker, index) => (
            <div
              className="card col-xl-4 col-md-6 col-12 mt-4 mx-auto"
              style={{ height: 100, width: 450 }}
              key={index}
            >
              <div className="container-xl row text-center">
                <div className="container-xl col-3" style={{ marginTop: 11 }}>
                  <ProfilePhoto width={"75"} height={"75"} />
                </div>
                <div className="container-xl col-4" style={{ marginTop: 20 }}>
                  <a
                    href={`/profile/${id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h4>{worker.name}</h4>
                    <link
                      rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                    />
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                  </a>
                </div>
                <div className="col-4">
                  <button
                    style={{
                      backgroundColor: "#fa6900",
                      color: "white",
                      marginTop: 25,
                    }}
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${index}`}
                  >
                    Remove Rejection
                  </button>
                </div>
              </div>

              <>
                <div
                  className="modal fade"
                  id={`exampleModal${index}`}
                  tabIndex="-1"
                  aria-labelledby={`exampleModalLabel${index}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Important!
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        Are you sure you accept this worker to be able to apply
                        again to this ad?
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => deleteRejectedWorkerButton(id, worker)}
                          data-bs-dismiss="modal"
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
