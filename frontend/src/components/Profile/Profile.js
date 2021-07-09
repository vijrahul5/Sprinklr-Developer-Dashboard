import React from "react";
import Loader from "../../globalComponents/Loader/Loader";
import { useFetchEmployeeData, useRequestManagerAccess } from "./profileHooks";
import { Button, SIZE } from "baseui/button";

function Profile() {
    const [loading, data, error] = useFetchEmployeeData(); // Fetches employee data using a custom hook
    const [requestError, requestManagerAccess] = useRequestManagerAccess();

    if (error) {
        alert(error);
    }
    if(requestError){
        alert(requestError);
    }

    if (loading) {
        return (
            <div className="profile">
                <Loader />
            </div>
        );
    }
    return (
        <>
            <div className="profile">
                <ul>
                    <div className="img-holder">
                        <img src={data.picture} alt="" />
                    </div>
                    <li>
                        <p className="param">Name:</p>
                        <p className="value">{data.name}</p>
                    </li>
                    <li>
                        <p className="param">Email:</p>
                        <p className="value">{data.email}</p>
                    </li>
                    <li>
                        <p className="param">Reports to:</p>
                        <p className="value">
                            {data.manager ? data.manager.email : "None"}
                        </p>
                    </li>
                </ul>
            </div>
            {data.managerAccess === false ? (
                <div className="requestForm">
                    <Button
                        type="submit"
                        className="submit btnCustom"
                        size={SIZE.compact}
                        onClick={(e)=>{
                            requestManagerAccess();
                        }}
                    >
                        Request Manager Access
                    </Button>
                </div>
            ) : null}
        </>
    );
}

export default Profile;
