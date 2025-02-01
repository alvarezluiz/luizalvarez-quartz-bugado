import { createClient } from './utils/supabase/server'

export default {
  async fetch(request, env, ctx) {
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY)

    // Verifica o token de autenticação
    const token = request.headers.get('Authorization')?.split('Bearer ')[1]
    if (!token) {
      return new Response('🔒 Token ausente! Faça login primeiro.', { 
        status: 401,
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    // Valida o token no Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) {
      return new Response('❌ Token inválido ou expirado!', { 
        status: 401,
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    // Se autenticado, serve o conteúdo estático do Quartz (corrigi o URL duplicado)
    const url = new URL(request.url)
    const resposta = await fetch(`https://luizalvarez-quartz.pages.dev${url.pathname}`)
    return resposta
  }
}