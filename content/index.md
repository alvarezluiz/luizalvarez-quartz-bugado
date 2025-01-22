---
{"title":"Login","publish":true,"PassFrontmatter":true}
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <style>
        .login-container {
            text-align: center;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
            margin: 50px auto;
            max-width: 400px;
        }
        .login-container h1 {
            margin-bottom: 20px;
        }
        .login-button {
            background-color: #4285F4;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .login-button:hover {
            background-color: #357ae8;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h1>Faça Login</h1>
        <p>Entre com sua conta do Google para acessar o site.</p>
        <button class="login-button" onclick="loginComGoogle()">Login com Google</button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>
    <script src="/quartz/static/auth.js"></script>
</body>
</html>