# Gerando um Token no Google OAuth 2.0 Playground

## Passos para obter um token de acesso

### 1. Acesse o Google OAuth 2.0 Playground

Abra o seguinte link no navegador:

[OAuth 2.0 Playground](https://developers.google.com/oauthplayground)

### 2. Ativar "Use your own OAuth credentials"

1. No canto superior direito, marque a opção **"Use your own OAuth credentials"**.
2. Insira as credenciais do cliente (Client ID e Client Secret) da sua aplicação backend.

### 3. Selecionar os escopos de acesso

1. Na seção **"Step 1 Select & authorize APIs"**, expanda a categoria **"Google OAuth2 API"**.
2. Marque as opções:
   - `email`
   - `profile`
3. Clique no botão **"Authorize APIs"**.

### 4. Autorizar a aplicação

1. Escolha a conta Google para autenticação.
2. Conceda as permissões solicitadas.

### 5. Obter o código de autorização

Após a autorização, um código será gerado. Clique em **"Exchange authorization code for tokens"**.

### 6. Obter o id token

1. Após a troca do código, utilize o "id\_token" para realizar o login na aplicação backend.

---

Caso tenha dúvidas, consulte a [documentação oficial do OAuth 2.0 do Google](https://developers.google.com/identity/protocols/oauth2).

