const DB = 'http://127.0.0.1:8000/api/'

//új szint elmentése
export const saveLevel = async (level) => {

    const credentials = {
        username: localStorage.getItem('username'),
        levelAt: level,
    };

    try {
        const response = await fetch(DB +'setlevel/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert('Your level has been updated.');

        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
    }
}

//Szint lekérdezése adatbázisból
export const getLevel = async (username) => {
    try {
        const response = await fetch(DB +'level/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username })
        });

        const data = await response.json();

        if (data.status === 'success' && data.levelAt ) {
            alert('Login successful!');

            window.location.href = data.levelAt;
            
        } else {
            alert("Something ain't right.");
        }
    } catch (error) {
        console.error(error);
    }
}

//Felhasználó bejelentkezése
export const loginUser = async (credentials, username) => {

    try {
        const response = await fetch(DB + 'login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (data.status === 'success') {

            localStorage.setItem('username', username);
            getLevel(username);
            
        } else if (data.status === 'error') {
            // Handle error case
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
    }

    }

//Felhasználó kijelentkezése
export const logoutUser = async () => {

    try {
        const response = await fetch(DB + 'logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: localStorage.getItem('username') })
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert('Logout successful!');
            localStorage.setItem('username', '');
            window.location.href = "/";

        } else {
            alert("Something ain't right.");
        }
    } catch (error) {
        console.error(error);
    }

}

//Jelszó csere 
export const passwordChange = async (ChangeUserPswd,fadeInElement,sleep) => {

    try {
        const response = await fetch(DB + 'password_change/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ChangeUserPswd)
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert('Your password has been changed.');
            fadeInElement.classList.remove('fade-in');
            console.log("done and done")
            await sleep(3);
            window.location.href = "/";
        } else if (data.status === 'error') {
            // Handle error case
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
    }

}
//Felhasználó regisztrálása
export const registerUser = async (newUser, fadeInElement, sleep) =>{

    try {
        const response = await fetch(DB + 'register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert('Successful registration, now lets play');
            fadeInElement.classList.remove('fade-in');
            console.log("done and done")
            await sleep(3);
            window.location.href = "/";
        } else if (data.status === 'error') {
            // Handle error case
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
    }

}
//Felhasználó játékának folytatása
export const continueUser = async () => {

    try {
        const response = await fetch(DB +'level/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: localStorage.getItem('username') })
        });

        const data = await response.json();

        if (data.status === 'success' && data.levelAt) {
            
            window.location.href = data.levelAt;

        } else {
            alert("Something ain't right.");
        }
    } catch (error) {
        console.error(error);
    }
}

//Jelszó ellenörzés
export const validatePassword = (password, confirmPassword) => {

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return false;
        }

        if (!/\d/.test(password)) {
            alert("Password must contain at least one number.");
            return false;
        }
        return true;
    }


//Alvási idő beállítása
export const sleep = (seconds) => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}


