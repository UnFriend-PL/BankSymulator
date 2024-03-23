import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
import apiService from "../../Services/ApiService";

export function Application({ application, display, refetch }) {
  const [showContent, setShowContent] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const [refresh, setRefresh] = useState(false);
  const handleAccept = async (e) => {
    const response = await apiService(
      "patch",
      `/api/Application/AcceptApplication/${application.applicationId}/${e}`,
      undefined,
      true
    );
    if (response.success === true) {
      showNotification([{ message: "Application accepted", type: "info" }]);
      refetch("Archived");
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
