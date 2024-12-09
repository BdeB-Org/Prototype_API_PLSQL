//http_status.js
httpStatus = {
    Success:200,
    Bad_Request:400, // This means that client side input fails validation.
    Unauthorized:401,// This means the user isn't not authorized to access a resource. It usually returns when the user isn't authenticated.
    Forbidden:403,// This means the user is authenticated, but it's not allowed to access a resource.
    Not_Found: 404,// This indicates that a resource is not found.
    Internal_server:500,// This is a generic server error. It probably shouldn't be thrown explicitly.
    Bad_Gateway:502,// This indicates an invalid response from an upstream server.
    Service_Unavailable:503// This indicates that something unexpected happened on server side
};
module.exports = httpStatus;
// source: https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/