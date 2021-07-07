import React from "react";
import Loader from "../../components/Loader/Loader";
import { useFetchEmployeeData } from "./profileHooks";

function Profile() {
    const [loading, data, error] = useFetchEmployeeData(); // Fetches employee data using a custom hook

    if (error) {
        alert(error);
        window.location.reload();
    }

    if (loading) {
        return (
            <div className="profile">
                <Loader />
            </div>
        );
    }

    return (
        <div className="profile">
            <div className="img-holder">
                <img src={data.picture} alt="" />
            </div>
            <ul>
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
    );
}

export default Profile;
