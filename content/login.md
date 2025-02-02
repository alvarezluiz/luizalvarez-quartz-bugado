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
        // Monitora mudanças de autenticação
        supabase.auth.onAuthStateChange((event, session) => {
  // Verifica se o usuário está logado E se não está já na página inicial
  if (session?.access_token && window.location.pathname !== '/') {
    localStorage.setItem('token', session.access_token);
    window.location.href = '/';
  }
  // Se não tem sessão E está na página de login, não faz nada
  else if (!session && window.location.pathname === '/login') {
    return;
  }
  // Se não tem sessão, redireciona para o login
  else if (!session) {
    window.location.href = '/login';
  }
});
</script>
</body>
</html>
