import React, { useContext, useEffect, useState } from "react";
import apiService from "../../Services/ApiService";
import "./ApplicationModule.scss";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
import { Application } from "../../Components/ApplicationComponent/Application";
import { useAdminContext } from "../../Providers/AdminProvider/AdminProvider";
export default function ApplicationModule() {
  const [sentApplications, setSentApplications] = useState([]);
  const { showNotification } = useContext(NotificationContext);
  const [fetchStatus, setFetchStatus] = useState("Pending");
  const { isLoginAsAdmin, getSearchedUser, searchedUser } = useAdminContext();
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
      const endpoint =
        isLoginAsAdmin && searchedUser
          ? `/api/Admin/Applications/JointApplications/${
              getSearchedUser() ? getSearchedUser().id : ""
            }/${fetchStatus}`
          : `/api/Application/JointApplications/${fetchStatus}`;
      const response = await apiService("get", endpoint, undefined, true);
      if (response.success === true) {
        setSentApplications(response.data);
        console.log(response.data);
      } else {
        showNotification(response);
      }
    };
    fetchApplications();
  }, [fetchStatus, isLoginAsAdmin, searchedUser]);

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
            refetch={handleChangeApplicationsView}
          ></Application>
        ))}
      </div>
    </div>
  );
}
