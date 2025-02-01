---
{"title":"Login","publish":true,"PassFrontmatter":true}
---

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <!-- Inclua a biblioteca do Supabase via CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</head>
<body>
    <button onclick="login()">Login com Google</button>
    <script>
        // Configure o cliente Supabase
        const supabase = createClient(
            'https://udgswbonvjtklarurlxn.supabase.co', 
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkZ3N3Ym9udmp0a2xhcnVybHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0MTM2NjksImV4cCI6MjA1Mjk4OTY2OX0.vG26YUkPae0C1Dm06J5ZkfWvEsfJ6jXd-QdeEzfOKGI' // Chave pública (anon)
        );
        async function login() {
            try {
                const { data, error } = await supabase.auth.signInWithOAuth({
                    provider: 'google',
                });
                if (error) {
                    console.error('Erro no login:', error);
                    alert('Falha no login!');
                }
            } catch (err) {
                console.error('Erro inesperado:', err);
            }
        }
        // Monitora o estado da autenticação
        supabase.auth.onAuthStateChange((event, session) => {
            if (session?.access_token) {
                localStorage.setItem('token', session.access_token);
                alert('Login bem-sucedido! Token salvo.');
                window.location.href = '/'; // Redireciona para a página principal
            }
        });
    </script>
</body>
</html>