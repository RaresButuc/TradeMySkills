import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DefaultURL from "../GlobalVariables";
import ProfilePhoto from "../shared/ProfilePhoto";

export default function RejectedWorkersPage() {
  const { id } = useParams();

  const [rejectedWorkers, setRejectedWorkers] = useState(null);
  const [deletedWorkerName, setDeletedWorkerName] = useState(null);

  useEffect(() => {
    const getRejectedWorkers = async () => {
      try {
        const response = await axios.get(
          `${DefaultURL}/ads/rejected/workers/${id}`
        );
        const data = response.data;
        setRejectedWorkers(data);
      } catch (err) {
        console.log(err);
      }
    };
    getRejectedWorkers();
  }, [deletedWorkerName]);

  const deleteRejectedWorkerButton = async (idOfAd, nameOfTheWorker) => {
    try {
      await axios.put(
        `${DefaultURL}/ads/rejected/remove/${idOfAd}/${nameOfTheWorker}`,
        {}
      );
      setDeletedWorkerName(nameOfTheWorker);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ marginTop: 110 }}>
      <h1 className="mb-5">Ad #{id} Rejected Workers</h1>
      <div>
        {rejectedWorkers?.map((worker, index) => (
          <div
            className="card col-xl-4 col-md-6 mx-auto my-5 w-25"
            style={{ height: 100 }}
            key={index}
          >
            <a
              href={`/profile/${id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="container-xl row text-center">
                <div className="container-xl col-3" style={{ marginTop: 11 }}>
                  <ProfilePhoto width={"75"} height={"75"} />
                </div>
                <div className="container-xl col-4" style={{ marginTop: 20 }}>
                  <h4>{worker.name}</h4>
                  <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                  />
                  <div className="container-xl">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                  </div>
                </div>
              </div>
            </a>
            <>
              <button
                type="button"
                style={{
                  backgroundColor: "#fa6900",
                  color: "white",
                }}
                className="mt-2 "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Remove Rejection
              </button>

              <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
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
                        onClick={() =>
                          deleteRejectedWorkerButton(id, worker.name)
                        }
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
  );
}
