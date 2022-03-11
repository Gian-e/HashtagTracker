# HashtagTracker
Projeto de aplicação de monitoramento de hashtags e exibição em tela de acordo com seleção manual.

O sistema consiste em uma tela de controle responsável por buscar os tweets com a hashtag definida e permitir a aprovação dos tweets, que serão selecionados para serem exibidos em um telão (tela painel). A hashtag buscada pode ser alterada livremente na tela de controle.

## Instalação:
1. Modificar o arquivo `API/twitterApiKeys.json` preenchendo o valor **BearerToken** com o seu token obtido através de sua conta do [portal do desenvolvedor no twitter](https://developer.twitter.com/en/docs/twitter-api)

2. Para rodar o projeto localmente em uma máquina windows, basta abrir o arquivo `Start.bat` localizado na raiz do repositório

3. Caso não seja possível utilizar o arquivo `Start.bat`, abrir o terminal no diretório `/API` e executar o comando `npm start`. Repetir o processo no diretório `/WEB`

4. Após a execução, o sistema poderá por padrão ser acessado através do endereço http://localhost:3000

## Tecnologias utilizadas:
- Noje.js
- Express.js
- Node-json-db
- Socket.io
- Twitter-api-v2
- React
- Redux

## Melhorias previstas:
- Containerização das aplicações
- Customização da quantidade de tweets buscados por consulta
- Otimizar consulta à API do twitter fazendo buscas periódicas e evitando buscar tweets repetidos
- Reestruturar o código deixando de forma mais organizada e separando responsabilidades
- Permitir reordenação dos tweets 
