const monthly = document.querySelector("#monthly")
const yearly = document.querySelector("#anually")

const text = document.querySelector("#basicp44")
const text2 = document.querySelector("#basicp444")


yearly.addEventListener("click", year)
monthly.addEventListener("click", month)

function year() {
    yearly.classList.add("active")
    monthly.classList.remove("active")
    text.innerHTML = `$200<span>/year</span>`
    text2.innerHTML = `$300<span>/year</span>`
}
function month() {
    monthly.classList.add("active")
    yearly.classList.remove("active")
    text.innerHTML = `$20<span>/month</span>`
    text2.innerHTML = `$30<span>/month</span>`
}


