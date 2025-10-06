front/entrar : usuario salva nome do usuario no localStorage para ficar persistente no browser

back/join/:room : browser faz uma conexao websocket, em que manda as tentativas e que recebe os acertos de outras pessoas.
back/board/:room : browser no inicio e a cada alguns segundos pede tudo que foi feito até agora, caso tenha perdido alguma.

questoes:
 - [X] como identificar o usuario? pelo web socket nao da para passar nada de informacao sem ser pelo proprio websocket...
 - como vou salvar o board no back? (pode ser feito depois nao tem problema)
   - provavelmente do mesmo jeito que to guardando no front, usando o tipo Word e Words do front.

todo:
 - [x] decidir gameinfo e word list e word no front principalmente.
   - game info o principal, que eu nao modifico. dai o outro eu modifico?
   - ou ja modifico direto fodase? acho que sim !! NAO pq tem rooms cada room precisa pegar do zero
   - GameBase -> dados que vem do g1, só com algumas diferenças, só vai mudar quando mudar o dia
   - GameInfo -> dados que vem do GameBase, no principio escondendo as palavras, vai ser mandado para o front
 - [x] reconectar quando desconectar
 - [x] resolver problema de quando erra aparece no outro
 - [x] falar quando acerto
 - [ ] quando jogador A coloca um que ja achou aparece erro para jogador A, mas para outros jogadores aparece que ele achou mesmo. talvez nao transmitir para todos o erro?
 - [ ] mostrar quantidade de palavras.
 - [ ] quando alguem tenta um que ja achou os outros recebem que ele achou
 - [ ] placar
 - [ ] total de palavras
 - [ ] tirar serializer para uma nova rota que vai retornar as words naquela room do jeito que front quer
 - [ ] deixar bonito
   - [x] adicionar uma cor baseada no nome (ou numa hash de nome), acredito que deve ser escolher uma saturacao um brilho e mudar a hue com base nessa hash.
     - [ ] mudar para parar de usar as cores do tailwind, usar
       - [ ] a) uma paleta
       - [ ] b) variaveis css pra calcular so uma vez qual cor de acento é para pegar
   - [ ] piscar o background de um jeito legal com a com de quem acertou
   - [ ] fazer buttons e textfields

 - [ ] EXTRA: categorias novas (so paises, times de futebol, jogadores, comida)

 - [x] ordenar as palavras como no jogo original
 - [x] fazer um monorepo baseado no blogpost que vi no dia 24/09 (ou dia 28 nao lembro direito)
