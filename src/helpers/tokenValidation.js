import jwt_decode from 'jwt-decode';

function tokenValidation(jwtToken) {
    const decodedToken = jwt_decode(jwtToken);
    console.log(decodedToken);
    const expirationTime = decodedToken.exp * 1000;

    return Date.now() < expirationTime;
}

export default tokenValidation;