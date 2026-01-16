# Como Gerar uma Senha de App do Google para SMTP

Este guia explica como criar uma **Senha de App** (App Password) no Google para usar com o serviço de envio de emails via SMTP.

---

## ⚠️ Pré-requisito Obrigatório

Para gerar uma Senha de App, você **precisa ter a Verificação em Duas Etapas (2FA) ativada** na sua conta Google.

---

## Passo 1: Ativar a Verificação em Duas Etapas

> Se você já tem a verificação em duas etapas ativada, pule para o **Passo 2**.

1. Acesse sua conta Google: [https://myaccount.google.com](https://myaccount.google.com)

2. No menu lateral esquerdo, clique em **"Segurança"**

3. Na seção **"Como você faz login no Google"**, clique em **"Verificação em duas etapas"**

4. Clique em **"Começar"**

5. Siga as instruções para configurar:
   - Insira sua senha
   - Escolha um método de verificação (SMS, app autenticador, etc.)
   - Confirme seu número de telefone ou configure o app autenticador
   - Clique em **"Ativar"**

---

## Passo 2: Gerar a Senha de App

### Opção A: Acesso Direto (Recomendado)

1. Acesse diretamente: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

2. Faça login se solicitado

3. Prossiga para o **Passo 3**

### Opção B: Pelo Painel de Segurança (Interface Atualizada 2024+)

1. Acesse: [https://myaccount.google.com/security](https://myaccount.google.com/security)

2. Na seção **"How you sign in to Google"** (Como você faz login no Google), clique em **"2-Step Verification"** (Verificação em duas etapas)

3. Será solicitado que você faça login novamente para confirmar sua identidade

4. **Role a página para baixo** até encontrar a seção **"App passwords"** (Senhas de app)

5. Clique em **"App passwords"** para criar uma nova senha

> ⚠️ **Nota**: A opção "App passwords" só aparece DENTRO da página de "2-Step Verification", não na página principal de Segurança.

---

## Passo 3: Criar a Senha de App

1. Na página de Senhas de App, você verá um campo para nomear o app

2. Digite um nome descritivo, por exemplo:
   - `WeTech Website SMTP`
   - `Nodemailer`
   - `Formulário de Contato`

3. Clique em **"Criar"** ou **"Gerar"**

4. Uma senha de 16 caracteres será exibida (exemplo: `abcd efgh ijkl mnop`)

   > ⚠️ **IMPORTANTE**: Copie essa senha imediatamente! Ela só será mostrada uma vez.

---

## Passo 4: Configurar no Projeto

1. Abra o arquivo `.env` do projeto

2. Cole a senha no campo `SMTP_PASS`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreplywetech@gmail.com
SMTP_PASS=abcdefghijklmnop
```

> **Nota**: Remova os espaços da senha. A senha `abcd efgh ijkl mnop` deve ser inserida como `abcdefghijklmnop`.

---

## 🔒 Boas Práticas de Segurança

1. **Nunca compartilhe** a senha de app com outras pessoas

2. **Nunca commite** o arquivo `.env` no Git (verifique se está no `.gitignore`)

3. **Revogue senhas não utilizadas**: Você pode gerenciar e deletar senhas em [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

4. **Use uma conta específica** para envio de emails (como `noreplywetech@gmail.com`) ao invés de contas pessoais

---

## ❌ Problemas Comuns

### "Não encontro a opção Senhas de App"

- Verifique se a **Verificação em Duas Etapas está ativada**
- Contas de trabalho/escola (Google Workspace) podem ter essa opção desabilitada pelo administrador

### "Erro de autenticação ao enviar email"

- Confirme que a senha foi copiada corretamente (sem espaços)
- Verifique se o email em `SMTP_USER` está correto
- Certifique-se de que está usando a Senha de App, não a senha normal da conta

### "Acesso menos seguro a apps"

- Esta opção foi **descontinuada pelo Google** em 2022
- Agora é obrigatório usar Senhas de App com 2FA

---

## 📚 Links Úteis

- [Gerenciar sua Conta Google](https://myaccount.google.com)
- [Página de Senhas de App](https://myaccount.google.com/apppasswords)
- [Ajuda do Google - Senhas de App](https://support.google.com/accounts/answer/185833)
- [Documentação Nodemailer](https://nodemailer.com/usage/using-gmail/)

---

## ✅ Checklist Final

- [ ] Verificação em Duas Etapas ativada
- [ ] Senha de App gerada e copiada
- [ ] Senha configurada no arquivo `.env`
- [ ] Arquivo `.env` está no `.gitignore`
- [ ] Testado o envio de email
