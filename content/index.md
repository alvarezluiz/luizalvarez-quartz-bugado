---
{"title":"Login","publish":true,"PassFrontmatter":true}
---

<!DOCTYPE html>
<body>
  <button onclick="login()">Login com Google</button>
  <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
  <script>
    const supabase = createClient(
      'https://udgswbonvjtklarurlxn.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // Use a chave public (anon)
    );

    async function login() {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
    }

    // Monitora mudanças de autenticação
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token) {
        alert('Token obtido! Verifique o console.');
        console.log('TOKEN:', session.access_token);
      }
    });
  </script>
</body>