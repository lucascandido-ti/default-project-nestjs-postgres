# Projeto NestJS Pré-Configurado

Este projeto pré-configurado foi desenvolvido para facilitar a configuração e instalação de pacotes ao iniciar um novo projeto utilizando o NestJS.


## Funcionalidades

 - `@nestjs/config`: módulo de configuração que permite manipular o arquivo settings.json, onde ficam armazenadas informações sobre a API, cache, throttler e banco de dados.
 
Observação: o arquivo settings.json não foi commitado no repositório, mas existe um arquivo settings.template que pode ser copiado e renomeado para settings.json para ser utilizado no projeto.
- `TypeORM` `@nestjs/typeorm`: módulo de ORM que já vem com os arquivos de configuração prontos, sendo necessário apenas adicionar as informações de acesso ao banco de dados no arquivo settings.json e as entidades no diretório `packages/api/src/db/entities`.
- `Docker`: Este projeto possui um docker-compose que é responsavel por subir uma instancia de um banco de dados PostgreSQL para uso inicial.


## Como Utilizar

Para utilizar este projeto, siga os seguintes passos:

- Clone o repositório em sua máquina local: `https://github.com/lucascandido-ti/default-project-nestjs-postgres.git`.

- Rode o comando docker-compose para criar os containers do banco postgreSQL e algumas outras ferramentas
```docker
docker-componse up -d
```
- Copie o arquivo settings.template e renomeie para settings.json.

- Edite o arquivo settings.json adicionando as informações de acesso ao banco de dados e as configurações da API.

- Adicione as entidades do seu projeto no diretório packages/api/src/db/entities.

- Instale as dependências do projeto executando o comando npm install ou yarn.

- Inicie o servidor localmente utilizando o comando npm run dev ou yarn dev.

- Comece a desenvolver sua API utilizando o NestJS no diretório packages/api!



### Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/lucascandido-ti/default-project-nestjs-postgres.git my-project
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  yarn
```

Rode o docker-compose

```bash
  docker-compose up -d
```

Após criar o arquivo settings.json, inicie o servidor

```bash
  yarn api dev
```



## Comandos Disponíveis
- `yarn build`: compila o projeto para produção.

- `yarn dev`: inicia o servidor localmente em modo de desenvolvimento.

- `yarn migration:generate <nome-da-migracao>`: gera uma nova migração para o TypeORM.

- `yarn migration:run`: executa todas as migrações pendentes.

- `yarn migration:revert`: reverte a última migração executada.

### Comandos Adicionais
- `yarn api`: acessa o diretório `packages/api` para executar os comandos do NestJS.

## Estrutura do projeto

O projeto segue uma estrutura de workspaces do Yarn, com os seguintes pacotes:

- `api`: a API da aplicação, construída com o framework NestJS e utilizando o banco de dados PostgreSQL e o serviço de mensageria RabbitMQ.

Além disso, o projeto possui um arquivo `docker-compose.yml` que define a configuração de alguns containers Docker que podem ser utilizados para subir ferramentas úteis para o desenvolvimento e execução da aplicação, como um banco de dados PostgreSQL, um servidor Grafana para visualização de métricas e um servidor RabbitMQ para comunicação entre serviços.
Para subir os containers, basta executar o comando docker-compose up na raiz do projeto.
Certifique-se de ter o Docker instalado em sua máquina antes de executar este comando.

Não se esqueça de criar uma cópia do arquivo settings.template.json e renomeá-lo para settings.json, inserindo as informações necessárias para configurar a aplicação corretamente.
O arquivo settings.json é ignorado pelo Git para que você possa inserir informações sensíveis, como credenciais de banco de dados, sem comprometer a segurança do projeto.
