import { createClient } from '@supabase/supabase-js';

// Configuração da instância do Supabase
const SUPABASE_URL = 'https://udgswbonvjtklarurlxn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkZ3N3Ym9udmp0a2xhcnVybHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0MTM2NjksImV4cCI6MjA1Mjk4OTY2OX0.vG26YUkPae0C1Dm06J5ZkfWvEsfJ6jXd-QdeEzfOKGI';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Função para login com Google
export async function loginComGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Erro ao fazer login:', error.message);
      return { error };
    }

    console.log('Login iniciado. Redirecionando...');
    return { data };
  } catch (err) {
    console.error('Erro inesperado no login:', err);
    return { error: err };
  }
}

// Função para logout
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Erro ao sair:', error.message);
      return { error };
    }

    console.log('Logout realizado com sucesso.');
    return { success: true };
  } catch (err) {
    console.error('Erro inesperado no logout:', err);
    return { error: err };
  }
}
