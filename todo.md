front/entrar : usuario salva nome do usuario no localStorage para ficar persistente no browser

back/join/:room : browser faz uma conexao websocket, em que manda as tentativas e que recebe os acertos de outras pessoas.
back/board/:room : browser no inicio e a cada alguns segundos pede tudo que foi feito até agora, caso tenha perdido alguma.

questoes:
 - [X] como identificar o usuario? pelo web socket nao da para passar nada de informacao sem ser pelo proprio websocket...
 - como vou salvar o board no back? (pode ser feito depois nao tem problema)
   - provavelmente do mesmo jeito que to guardando no front, usando o tipo Word e Words do front.


todo:
 - [ ] resolver problema de quando erra aparece no outro
 - [ ] reconectar quando desconectar
 - [ ] falar quando acerto
 - [ ] placar
 - [ ] total de palavras
 - [ ] tirar serializer para uma nova rota que vai retornar as words naquela room do jeito que front quer
 - [ ] deixar bonito
   - [ ] adicionar uma cor baseada no nome (ou numa hash de nome), acredito que deve ser escolher uma saturacao um brilho e mudar a hue com base nessa hash.

 - [ ] EXTRA: categorias novas (so paises, times de futebol, jogadores, comida)

 - [x] ordenar as palavras como no jogo original
 - [x] fazer um monorepo baseado no blogpost que vi no dia 24/09 (ou dia 28 nao lembro direito)
