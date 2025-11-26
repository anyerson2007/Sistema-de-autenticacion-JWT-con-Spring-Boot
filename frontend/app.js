document.getElementById("btnShowLogin").onclick = ()=>switchTab("login");

document.getElementById("btnShowRegister").onclick = ()=>switchTab("register");

document.getElementById("loginBtn").onclick = login;

document.getElementById("registerBtn").onclick = register;

function switchTab(tab){
    const loginCard = document.getElementById("loginCard");
    const registerCard = document.getElementById("registerCard");

    const btnLogin = document.getElementById("btnShowLogin");
    const btnRegister = document.getElementById("btnShowRegister");

    if(tab === "login"){
        loginCard.classList.remove("hidden");
        registerCard.classList.add("hidden");

        btnLogin.classList.add("active");
        btnRegister.classList.remove("active");
    }else{
        loginCard.classList.add("hidden");
        registerCard.classList.remove("hidden");

        btnLogin.classList.remove("active");
        btnRegister.classList.add("active");
    }
}

async function register() {
    const username = document.getElementById("regUser").value;
    const password = document.getElementById("regPass").value;
    const role = document.getElementById("regRole").value;

    const res = await fetch(`http://localhost:8080/auth/register?username=${username}&password=${password}&role=${role}`,
        {method: "POST"}
    );

    document.getElementById("regMsg").innerText = res.ok ? "Usuario registrado exitosamente" : "Error en el registro";
}

async function login() {
    const username = document.getElementById("logUser").value;
    const password = document.getElementById("logPass").value;

    const res = await fetch(`http://localhost:8080/auth/login?username=${username}&password=${password}`,
        {method: "POST"}
    );

    const tokenText = await res.text();

    if(!res.ok){
        document.getElementById("loginMsg").innerText="Credenciales incorrectas";
        return;
    }

    localStorage.setItem("jwt", tokenText);
    document.getElementById("loginMsg").innerText="Inicio de sesión exitoso!!";

    setTimeout(()=>{
        window.location.href = "panel.html";
    },800);
}