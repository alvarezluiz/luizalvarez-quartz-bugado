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
        // Configure o cliente Supabase com suas credenciais
        const supabaseUrl = 'https://udgswbonvjtklarurlxn.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkZ3N3Ym9udmp0a2xhcnVybHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0MTM2NjksImV4cCI6MjA1Mjk4OTY2OX0.vG26YUkPae0C1Dm06J5ZkfWvEsfJ6jXd-QdeEzfOKGI';
        
        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

        // Defina a função login no escopo global
        window.login = async function() {
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
        };

        // Monitora mudanças de autenticação
        supabase.auth.onAuthStateChange((event, session) => {
            // Verifica se o usuário está logado E se não está já na página inicial
            if (session?.access_token) {
                if (window.location.pathname !== '/') {
                    localStorage.setItem('token', session.access_token);
                    window.location.href = '/';
                }
            } else {
                if (window.location.pathname === '/login') {
                    return;
                } else {
                    window.location.href = '/login';
                }
            }
        });
    </script>
</body>
</html>
2