import { createClient } from '@supabase/supabase-js';

export default {
  async fetch(request, env, ctx) {
    // Configura o cliente Supabase com as variáveis de ambiente
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

    // Extrai o token do cabeçalho Authorization
    const authHeader = request.headers.get('Authorization');
    const token = authHeader ? authHeader.split('Bearer ')[1] : null;

    // Se não houver token, retorna erro
    if (!token) {
      return new Response('🔒 Token ausente! Faça login primeiro.', { 
        status: 401,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }

    try {
      // Verifica o token no Supabase
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        return new Response('❌ Token inválido ou expirado!', { 
          status: 401,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      }

      // Se chegou aqui, o usuário é válido!
      return new Response(`🎉 Olá ${user.email}! Seu ID é: ${user.id}`, {
        headers: { 
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store' // Evita cache
        }
      });

    } catch (err) {
      // Erro inesperado
      return new Response(`⚠️ Erro interno: ${err.message}`, { 
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }
  }
};