import React from 'react';
import {Navigate} from "react-router-dom";

function PrivateRoute({auth, children}) {
    if(auth) {
        return children;
    } else {
        return <Navigate to="/signin" replace />;
    }
}

export default PrivateRoute;