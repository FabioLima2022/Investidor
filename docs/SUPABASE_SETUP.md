# Setup do Supabase

- Crie um projeto no Supabase (https://supabase.com)
- Copie a URL do projeto e a chave pública (anon key)
- Preencha [\.env](file:///c:/xampp/htdocs/Investidor%20Turbo/.env) com:
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY
- Abra o SQL Editor do Supabase e execute o arquivo [supabase_schema.sql](file:///c:/xampp/htdocs/Investidor%20Turbo/supabase_schema.sql)
- Em Authentication:
  - Habilite Email como provedor
  - Defina a URL de redirecionamento para desenvolvimento: http://localhost:8080/
- Em Policies, confirme as RLS criadas para as tabelas
- Teste login/registro pela aplicação
