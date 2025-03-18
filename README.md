# Sistema de Agendamento e Avaliação de Serviços

## **Propósito do Sistema**
O sistema tem como objetivo conectar **clientes** e **fornecedores de serviços locais**, facilitando o agendamento, a aprovação de solicitações e a avaliação dos serviços prestados. Ele permite que fornecedores anunciem seus serviços e definam as áreas que atendem, enquanto os clientes podem solicitar serviços, agendar horários e avaliar a qualidade do serviço após a conclusão.

---

## **Funcionalidades Principais**

### **Para Clientes**
1. **Cadastro/Login**: Registrar-se e acessar o sistema.
2. **Busca de Fornecedores**: Encontrar fornecedores por tipo de serviço, cidade e bairro.
3. **Solicitação de Serviço**: Solicitar um serviço, escolhendo data e período (manhã ou tarde).
4. **Aprovação/Sugestão de Data**: Receber notificações sobre a aprovação ou sugestão de uma nova data pelo fornecedor.
5. **Avaliação do Serviço**: Avaliar o serviço após a conclusão, com nota e comentário.
6. **Histórico de Serviços**: Visualizar o histórico de serviços solicitados e suas avaliações.

### **Para Fornecedores**
1. **Cadastro/Login**: Registrar-se e acessar o sistema.
2. **Definição de Área de Atuação**: Definir os bairros atendidos dentro de uma cidade.
3. **Gerenciamento de Serviços**: Adicionar, editar ou remover serviços oferecidos.
4. **Aprovação de Solicitações**: Aprovar ou sugerir uma nova data para as solicitações de serviço.
5. **Visualização de Avaliações**: Ver as avaliações recebidas dos clientes.
6. **Histórico de Serviços**: Visualizar o histórico de serviços prestados.

### **Para o Sistema**
1. **Notificações**: Enviar notificações por e-mail ou mensagem interna para clientes e fornecedores sobre atualizações de status.
2. **Busca e Filtros**: Permitir buscas avançadas com filtros por tipo de serviço, localização, avaliação, etc.
3. **Avaliações e Reputação**: Calcular a reputação do fornecedor com base nas avaliações recebidas.
4. **Pagamento (Opcional)**: Integração com sistemas de pagamento para pagamentos diretos pelo sistema.

---

## **Casos de Uso**

### **1. Cadastro de Usuário**
- **Ator**: Cliente ou Fornecedor.
- **Descrição**: Um usuário se registra no sistema como cliente, fornecedor ou ambos.
- **Fluxo**:
  1. O usuário acessa a página de cadastro.
  2. Preenche os dados básicos (nome, email, senha, telefone, endereço).
  3. Escolhe o tipo de usuário (cliente, fornecedor ou ambos).
  4. O sistema salva os dados e redireciona para a página inicial.

### **2. Solicitação de Serviço**
- **Ator**: Cliente.
- **Descrição**: Um cliente solicita um serviço de um fornecedor.
- **Fluxo**:
  1. O cliente busca um fornecedor por tipo de serviço e localização.
  2. Seleciona um serviço e escolhe uma data e período (manhã ou tarde).
  3. O sistema envia a solicitação para o fornecedor.
  4. O fornecedor aprova ou sugere uma nova data.
  5. O cliente recebe uma notificação sobre a decisão do fornecedor.

### **3. Aprovação de Solicitação**
- **Ator**: Fornecedor.
- **Descrição**: Um fornecedor aprova ou sugere uma nova data para uma solicitação de serviço.
- **Fluxo**:
  1. O fornecedor recebe uma notificação sobre uma nova solicitação.
  2. Visualiza os detalhes da solicitação (data, período, cliente).
  3. Aprova a solicitação ou sugere uma nova data.
  4. O sistema notifica o cliente sobre a decisão.

### **4. Avaliação do Serviço**
- **Ator**: Cliente.
- **Descrição**: Um cliente avalia um serviço após a conclusão.
- **Fluxo**:
  1. Após a conclusão do serviço, o cliente recebe uma solicitação para avaliar o serviço.
  2. O cliente fornece uma nota (de 1 a 5) e um comentário opcional.
  3. O sistema atualiza a reputação do fornecedor com base na avaliação.
  4. A avaliação é exibida na página do fornecedor.

---

## **Fluxos Básicos**

### **Fluxo de Solicitação e Execução de Serviço**
1. Cliente solicita um serviço.
2. Fornecedor aprova ou sugere nova data.
3. Serviço é executado na data acordada.
4. Cliente avalia o serviço.
5. Avaliação é exibida na página do fornecedor.

### **Fluxo de Cadastro e Gerenciamento de Serviços**
1. Fornecedor se cadastra no sistema.
2. Fornecedor define os serviços oferecidos e as áreas atendidas.
3. Cliente busca e solicita um serviço.
4. Fornecedor gerencia as solicitações recebidas.

---

## **Para subir a aplicação**

Ambiente Node.js com Nest.js configurado usando docker-compose.

Necessário docker e docker compose instalados para rodar o ambiente de desenvolvimento.

01 - Verificar no docker-compose.yml se o parâmetro INSTALL_NODE_MODULES está true e comentar as linhas de configuração de proxy (caso existam).

Obs: Caso queira criar um novo projeto Nest.js, copie os arquivos Dockerfile, docker-compose.yml e docker-entrypoint.sh para uma pasta vazia e defina os parâmetros CREATE_NEW_PROJECT_NESTJS e INSTALL_NODE_MODULES do docker-compose.ym para true.

02 - No terminal, rodar o seguinte comando para subir o ambiente:
```php
docker compose up
```