
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://udgswbonvjtklarurlxn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkZ3N3Ym9udmp0a2xhcnVybHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0MTM2NjksImV4cCI6MjA1Mjk4OTY2OX0.vG26YUkPae0C1Dm06J5ZkfWvEsfJ6jXd-QdeEzfOKGI';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true, // Armazena a sessão automaticamente
    autoRefreshToken: true, // Atualiza o token antes de expirar
  },
});


// Função para fazer login com o Google
export async function loginComGoogle() {
  console.log('Iniciando login com Google...');
  
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error('Erro ao fazer login:', error.message);
    return;
  }

  console.log('Login iniciado. Verificando sessão...');
  const session = supabase.auth.session();
  console.log('Sessão atual:', session);
}

// Chama a função de login e Torna a função disponível no escopo global
window.loginComGoogle = loginComGoogle;
