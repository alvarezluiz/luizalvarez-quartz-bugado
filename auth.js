
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://udgswbonvjtklarurlxn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkZ3N3Ym9udmp0a2xhcnVybHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0MTM2NjksImV4cCI6MjA1Mjk4OTY2OX0.vG26YUkPae0C1Dm06J5ZkfWvEsfJ6jXd-QdeEzfOKGI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);


const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Armazena a sessão automaticamente
    autoRefreshToken: true, // Atualiza o token antes de expirar
  },
});


// Função para fazer login com o Google
export async function loginComGoogle() {
  const { user, session, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error('Erro ao fazer login:', error.message);
  } else {
    console.log('Usuário logado:', user);
    // Aqui você pode redirecionar ou fazer o que quiser após o login
  }
}

// Chama a função de login e Torna a função disponível no escopo global
window.loginComGoogle = loginComGoogle;
