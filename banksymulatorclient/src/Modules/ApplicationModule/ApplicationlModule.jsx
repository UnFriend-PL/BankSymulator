import React, { useContext, useEffect, useState } from "react";
import apiService from "../../Services/ApiService";
import "./ApplicationModule.scss";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
export default function ApplicationModule() {
  const [sentApplications, setSentApplications] = useState([]);
  const { showNotification } = useContext(NotificationContext);
  const [fetchStatus, setFetchStatus] = useState("Pending");
  const handleChangeApplicationsView = (e) => {
    switch (e) {
      case "Pending":
        setFetchStatus("Pending");
        break;
      case "Sent":
        setFetchStatus("Sent");
        break;
      case "Archived":
        setFetchStatus("Archived");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await apiService(
        "get",
        `/api/Application/JointApplications/${fetchStatus}`,
        undefined,
        true
      );
      if (response.success === true) {
        setSentApplications(response.data);
        console.log(response.data);
      } else {
        showNotification(response);
      }
    };
    fetchApplications();
  }, [fetchStatus]);

  return (
    <div className="applicationWrapper">
      <div className="applicationWrapper__applications">
        <div className="applicationWrapper__applications__button">
          <button
            disabled={fetchStatus === "Pending"}
            onClick={() => {
              handleChangeApplicationsView("Pending");
            }}
          >
            Pending
          </button>
          <button
            disabled={fetchStatus === "Sent"}
            onClick={() => {
              handleChangeApplicationsView("Sent");
            }}
          >
            Sent
          </button>
          <button
            disabled={fetchStatus === "Archived"}
            onClick={() => {
              handleChangeApplicationsView("Archived");
            }}
          >
            Archived
          </button>
        </div>
        <div className="applicationWrapper__applications__header">
          <div className="applicationWrapper__applications__header__status">
            Status
          </div>
          <div className="applicationWrapper__applications__header__subject">
            Subject
          </div>
          <div className="applicationWrapper__applications__header__to">
            Sent to
          </div>
          <div className="applicationWrapper__applications__header__date">
            Date
          </div>
        </div>
        {sentApplications.map((application, index) => (
          <Application
            key={index}
            application={application}
            display={fetchStatus}
          ></Application>
        ))}
      </div>
    </div>
  );
}
function Application({ application, display }) {
  const [showContent, setShowContent] = useState(false);
  const handleAccept = async (e) => {
    const response = await apiService(
      "patch",
      `/api/Application/AcceptApplication/${application.applicationId}/${e}`,
      undefined,
      true
    );
    if (response.success === true) {
      showNotification(response);
    } else {
      showNotification(response);
    }
  };

  return (
    <div className="applicationWrapper__applications__application">
      <div
        className="applicationWrapper__applications__application__preview"
        onClick={() => {
          setShowContent(!showContent);
        }}
      >
        <div
          className={`applicationWrapper__applications__application__preview__status ${application.status}`}
        >
          {display == "Sent" ? display : application.status}
        </div>
        <div className="applicationWrapper__applications__application__preview__subject">
          {application.subject}
        </div>
        <div className="applicationWrapper__applications__application__preview__to">
          {application.jointName} {application.jointSurname}
        </div>
        <div className="applicationWrapper__applications__application__preview__date">
          {application.sendTime.split("T")[0]}
        </div>
      </div>
      {showContent && (
        <div className="applicationWrapper__applications__application__content">
          <div className="applicationWrapper__applications__application__content__message">
            {application.message}
          </div>
          {display == "Pending" && (
            <>
              <div className="applicationWrapper__applications__application__content__buttons">
                <button
                  className="accept"
                  onClick={() => {
                    handleAccept(true);
                  }}
                >
                  Accept
                </button>
                <button
                  className="decline"
                  onClick={() => {
                    handleAccept(false);
                  }}
                >
                  Decline
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
