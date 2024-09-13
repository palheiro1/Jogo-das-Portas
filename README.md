# Jogo das 3 Portas

Este projeto é uma implementação de um jogo simples baseado no famoso problema de Monty Hall. A aplicação permite que você teste a teoria de Monty Hall jogando várias vezes e verificando os resultados de acordo com as duas estratégias possíveis: manter a escolha original ou trocar a escolha.

## Descrição do Jogo

O jogo consiste em três portas, atrás das quais há um tesouro escondido em uma delas. As outras duas portas não contêm nada. O jogador deve escolher uma porta. Se o jogador escolher a porta com o tesouro, ganha o jogo. Caso contrário, o programa oferece a opção de trocar a porta inicialmente escolhida por outra porta que não tenha sido escolhida ainda.

### Funcionamento

1. O jogador escolhe uma porta.
2. Se a porta escolhida contém o tesouro, o programa oferece uma alternativa aleatória.
3. Se a porta escolhida não contém o tesouro, o programa revela qual porta contém o tesouro e oferece a opção de trocar.
4. O jogador decide se mantém a escolha original ou troca para a nova porta oferecida.
5. O resultado é revelado e o jogo registra se o jogador ganhou ou perdeu.
6. A aplicação mantém um contador de vitórias e derrotas.

## Teoria do Problema de Monty Hall

O problema de Monty Hall é um famoso paradoxo de probabilidade baseado em um jogo de TV. Aqui está a teoria básica:

1. **Escolha Inicial**: Você escolhe uma porta, que tem uma chance de 1/3 de conter o tesouro e uma chance de 2/3 de não conter.
2. **Porta Revelada**: O apresentador revela uma das portas restantes que não tem o tesouro.
3. **Troca ou Manutenção**: Você tem a opção de trocar para a outra porta ou manter a escolha original.

### Resultado Esperado

De acordo com a teoria, se você sempre trocar a porta depois que o apresentador revela uma porta sem tesouro, você terá uma chance de 2/3 de ganhar o tesouro. Se você sempre mantiver a porta escolhida inicialmente, suas chances de ganhar serão de 1/3.

## Instruções para Jogar

1. **Jogar**: Clique em uma das três portas para fazer sua escolha inicial.
2. **Decidir**: Após a escolha, você verá a opção de manter ou trocar a porta. Clique no botão correspondente para decidir.
3. **Ver Resultados**: O resultado do jogo será exibido e o contador de vitórias e derrotas será atualizado.
4. **Reiniciar**: Clique no botão "Jogar novamente" para iniciar uma nova rodada.

## Como Executar

1. Clone o repositório para sua máquina local.
2. Navegue até o diretório do projeto.
3. Instale as dependências com `npm install`.
4. Inicie o servidor de desenvolvimento com `npm start`.
5. Abra o navegador e acesse `http://localhost:3000` para jogar.

## Contribuições

Contribuições são bem-vindas! Se você tiver melhorias ou correções, sinta-se à vontade para enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Divirta-se testando o problema de Monty Hall e explorando a teoria das probabilidades!
