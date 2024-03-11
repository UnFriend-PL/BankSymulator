import React, { useContext, useEffect, useState } from "react";
import apiService from "../../Services/ApiService";
import "./ApplicationModule.scss";
import { NotificationContext } from "../../Providers/NotificationProvider/NotificationProvider";
export default function ApplicationModule() {
  const [sentApplications, setSentApplications] = useState([]);
  const { showNotification } = useContext(NotificationContext);
  useEffect(() => {
    const fetchApplications = async () => {
      const response = await apiService(
        "get",
        "/api/Application/SentJointApplications",
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
  }, []);

  return (
    <div className="mailWrapper">
      <div className="mailWrapper__mails">
        {sentApplications.length > 0 ? (
          sentApplications.map((application, index) => (
            <div key={index} className="mailWrapper__mails__mail">
              <>
                t<p>Application ID: {application.applicationId}</p>
                <p>Message: {application.message}</p>
                <p>Subject: {application.subject}</p>
                <p>Status: {application.status}</p>
                <p>Send Time: {application.sendTime}</p>
                <p>Joint Name: {application.jointName}</p>
                <p>Joint Surname: {application.jointSurname}</p>
                <p>Joint Email: {application.jointEmail}</p>
                <p>Joint Phone Number: {application.jointPhoneNumber}</p>
                <p>Requester Name: {application.requesterName}</p>
                <p>Requester Surname: {application.requesterSurname}</p>
                <p>Requester Email: {application.requesterEmail}</p>
                <p>
                  Requester Phone Number: {application.requesterPhoneNumber}
                </p>
                <p>Account Number: {application.accountNumber}</p>
              </>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
