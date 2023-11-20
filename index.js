const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const dobEl = document.getElementById("dob");
const termsEl = document.getElementById("acceptTerms");
const submitEl = document.getElementById("submit");
const historyEl = document.getElementById("history");

const date = new Date();
let allEntries = []

const dateValidity = (givenDate) => {

    const userDate = givenDate.split("-").map((d) => Number(d))
    const validDateYear = (userDate[0] >= (date.getFullYear() - 55) && userDate[0] <= (date.getFullYear() - 18))

    let validDateMonth;
    let validDateDay;

    if (userDate[0] === date.getFullYear() - 55) {
        validDateMonth = userDate[1] >= (date.getMonth() + 1)
        validDateDay = userDate[2] >= (date.getDate())
    } else if (userDate[0] === date.getFullYear() - 18) {
        validDateMonth = userDate[1] <= (date.getMonth() + 1)
        validDateDay = userDate[2] <= (date.getDate())
    } else if (validDateYear) {
        validDateMonth = true
        validDateDay = true
    } else {
        validDateMonth = false
        validDateDay = false
    }

    return validDateYear && validDateMonth && validDateDay
}

const checkValidity = (element) => {
    return element.validity.valid
}

const digits = (num) => {
    if (num < 10) {
        return "0" + num
    } else {
        return num
    }
}
const sendStorage = (name, email, password, dob, terms) => {
    const userData = {
        name,
        email,
        password,
        dob,
        terms
    }
    allEntries.push(userData)
    localStorage.setItem('userData', JSON.stringify(allEntries))
}

const getStorage = () => {
    allEntries = JSON.parse(localStorage.getItem("userData"))
    if (allEntries === null) {
        allEntries = []
    } else {
        const view = allEntries.map((entry) => {
            let row = ""
            const allKeys = Object.keys(entry)

            for (let i = 0; i < allKeys.length; i++) {
                row += `<td>${entry[allKeys[i]]}</td>`
            }

            return `<tr>${row}</tr>`
        })
        historyEl.innerHTML += view.join("\n")
    }
}


submitEl.addEventListener("click", () => {
    const userDate = dobEl.value

    if (!dateValidity(userDate)) {
        dobEl.setCustomValidity(`Date must be between ${date.getFullYear() - 55}-${digits(date.getMonth() + 1)}-${digits(date.getDate())} and ${date.getFullYear() - 18}-${digits(date.getMonth() + 1)}-${digits(date.getDate())}`)
    } else {
        dobEl.setCustomValidity("")
    }

    const allValid = checkValidity(nameEl) && checkValidity(emailEl) && checkValidity(passwordEl) && checkValidity(dobEl)

    if (allValid) {
        sendStorage(nameEl.value, emailEl.value, passwordEl.value, dobEl.value, termsEl.checked)
    }
})

getStorage()