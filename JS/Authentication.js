
function protectPage() {
  const activeUser = localStorage.getItem("activeUser");

  if (!activeUser) {
    window.location.href = "signup.html";
  } 
} 