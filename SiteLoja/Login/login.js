document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que o formulário seja enviado

    // Limpar mensagens de erro anteriores
    document.getElementById("usernameError").style.display = "none";
    document.getElementById("passwordError").style.display = "none";
    document.getElementById("feedback").innerHTML = '';

    // Obter valores dos campos
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validação
    let valid = true;

    if (username === "") {
        document.getElementById("usernameError").style.display = "block";
        document.getElementById("usernameError").textContent = "Por favor, insira um nome de usuário.";
        valid = false;
    }

    if (password === "") {
        document.getElementById("passwordError").style.display = "block";
        document.getElementById("passwordError").textContent = "Por favor, insira uma senha.";
        valid = false;
    }

    if (valid) {
        // Simulação de login bem-sucedido
        document.getElementById("feedback").style.color = "green";
        document.getElementById("feedback").textContent = "Login realizado com sucesso!";
    } else {
        // Exibir mensagem de erro
        document.getElementById("feedback").style.color = "red";
        document.getElementById("feedback").textContent = "Preencha todos os campos corretamente.";
    }
});
