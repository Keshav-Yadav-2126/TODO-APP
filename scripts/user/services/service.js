export function login(user) {
    if (localStorage) {
        if (localStorage.userInfo) {
            alert("already registered")
        }
        else{
            localStorage.userInfo = JSON.stringify(user)
        }
    }
    else{
        prompt("version is old.")
    }
}