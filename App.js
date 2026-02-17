const loggedIn = localStorage.getItem("users")

if (loggedIn) {
  window.location.href = "Homepage.html"
} 