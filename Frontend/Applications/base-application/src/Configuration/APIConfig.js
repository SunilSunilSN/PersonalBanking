export const APIConfig = {
    createUserAPI : {
        method: "POST",
        service: "REACT_APP_USERMANGMENT_MICROSERICE",
        headers: {
            "Content-Type": "application/json"
        },
        enpointurl: "/user/createUser"
    }
}