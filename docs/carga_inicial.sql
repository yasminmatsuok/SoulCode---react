-- Carga inicial do banco do SoulCode, com os mesmos dados de src/mocks/seed.ts.
-- Rodar depois de criar as tabelas descritas em docs/MODELO_DADOS.md.
-- A senha do usuário de demonstração é só um exemplo: a API deve gravar o hash real.

-- Usuário de demonstração (o front usa o id 1)
INSERT INTO usuario (id, nome, email, senha_hash, idade, cidade, interesse, pontos) VALUES
  (1, 'Usuário Demo', 'demo@soulcode.com', 'TROCAR_PELO_HASH', 20, 'São Paulo', 'Reciclagem', 450);

INSERT INTO avatar (id, usuario_id, nome, nivel) VALUES
  (1, 1, 'Soul', 2);

-- Missões
INSERT INTO missao (id, icone, titulo, descricao, descricao_longa, pontos, dificuldade) VALUES
  (1, '🚌', 'Use Transporte Público', 'Utilize o transporte público por 5 dias seguidos e registre suas viagens.', 'Durante 5 dias seguidos, prefira o transporte público ao invés do carro particular. Registre cada viagem no app para comprovar o cumprimento da missão e ajudar a reduzir a emissão de carbono na cidade.', 50, 'facil'),
  (2, '♻️', 'Recicle seu Lixo', 'Separe o lixo corretamente por uma semana e tire uma foto como prova.', 'Separe corretamente os resíduos recicláveis, orgânicos e rejeitos por uma semana inteira. Ao final, tire uma foto do seu sistema de separação para comprovar a missão.', 30, 'facil'),
  (3, '💡', 'Economize Energia', 'Reduza o consumo de energia em 20% comparado ao mês anterior.', 'Compare sua conta de energia do mês atual com a do mês anterior e busque reduzir o consumo em pelo menos 20%, desligando aparelhos em stand-by e otimizando o uso de iluminação.', 80, 'medio'),
  (4, '🌱', 'Plante uma Muda', 'Plante uma muda de árvore ou planta e documente o processo.', 'Escolha uma muda de árvore ou planta nativa da sua região, plante em um espaço adequado e documente com fotos o processo de plantio e os primeiros dias de crescimento.', 100, 'medio'),
  (5, '🚲', '30 Dias sem Carro', 'Passe 30 dias utilizando apenas transporte público, bicicleta ou caminhada.', 'Desafie-se a passar 30 dias sem usar o carro particular, priorizando transporte público, bicicleta ou caminhada para todos os seus deslocamentos.', 200, 'dificil'),
  (6, '☀️', 'Energia Solar', 'Instale um painel solar ou utilize energia renovável por 30 dias.', 'Instale um sistema de energia solar residencial ou contrate um plano de energia 100% renovável, mantendo o uso por pelo menos 30 dias consecutivos.', 300, 'dificil'),
  (7, '🛍️', 'Leve sua Ecobag', 'Use sacola reutilizável em todas as compras durante 2 semanas.', 'Durante 2 semanas, recuse sacolas plásticas no mercado, na farmácia e nas lojas, usando sempre uma ecobag ou sacola reutilizável. Registre uma foto da sacola em uso para comprovar a missão.', 40, 'facil'),
  (8, '🍂', 'Composte Restos de Comida', 'Monte uma composteira e transforme restos de alimentos em adubo por 1 mês.', 'Monte uma composteira doméstica (pode ser de baldes) e deposite nela cascas de frutas, legumes e borra de café durante 1 mês. Ao final, use o adubo em um vaso ou jardim e registre o resultado com fotos.', 150, 'medio');

-- Recompensas
INSERT INTO recompensa (id, nome, descricao, icone, categoria, custo_pontos, estoque, ativa, criada_em) VALUES
  (1, '10% de desconto na conta de luz', 'Desconto aplicado na próxima fatura de energia elétrica junto à distribuidora parceira.', '💡', 'energia', 300, 20, TRUE, TIMESTAMP '2026-09-01 10:00:00'),
  (2, 'R$ 10 no Bilhete Único', 'Crédito carregado direto no seu cartão de transporte público.', '🚌', 'transporte', 150, 50, TRUE, TIMESTAMP '2026-09-03 14:30:00'),
  (3, 'Cesta de orgânicos', 'Cesta com frutas e verduras de produtores locais, entregue na sua casa.', '🥗', 'alimentacao', 400, 8, TRUE, TIMESTAMP '2026-09-10 09:15:00'),
  (4, 'Ingresso de cinema', 'Um ingresso 2D válido em qualquer sessão da rede parceira, de segunda a quinta.', '🎬', 'cultura', 250, 15, TRUE, TIMESTAMP '2026-09-12 18:00:00'),
  (5, '1 mês de bike compartilhada', 'Plano mensal de bicicleta compartilhada com viagens ilimitadas de até 45 minutos.', '🚲', 'transporte', 500, 5, TRUE, TIMESTAMP '2026-09-20 11:45:00'),
  (6, 'Árvore plantada em seu nome', 'Uma ONG parceira planta uma muda nativa e envia o certificado com a localização.', '🌳', 'parceiros', 50, 100, TRUE, TIMESTAMP '2026-10-01 08:00:00'),
  (7, 'Consultoria de energia solar', 'Visita técnica para avaliar a instalação de painéis solares na sua residência.', '☀️', 'energia', 1200, 3, FALSE, TIMESTAMP '2026-10-05 16:20:00'),
  (8, 'Kit de garrafa e canudo reutilizáveis', 'Garrafa térmica de inox e canudo de metal com escovinha, para dizer adeus ao plástico descartável.', '🧴', 'parceiros', 200, 25, TRUE, TIMESTAMP '2026-10-10 10:30:00'),
  (9, 'Feira orgânica com 15% de desconto', 'Cupom de 15% de desconto em uma compra na feira orgânica parceira do seu bairro.', '🥕', 'alimentacao', 120, 40, TRUE, TIMESTAMP '2026-10-15 08:45:00');

-- Conversões do usuário 1
INSERT INTO conversao (id, usuario_id, recompensa_id, quantidade, pontos_gastos, status, criada_em) VALUES
  (1, 1, 2, 1, 150, 'aprovada', TIMESTAMP '2026-10-02 13:10:00'),
  (2, 1, 6, 1, 50, 'pendente', TIMESTAMP '2026-10-20 09:40:00'),
  (3, 1, 6, 2, 100, 'cancelada', TIMESTAMP '2026-10-22 17:05:00');