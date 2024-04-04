# AppNodejs :atom:

O AppNodejs é uma aplicação projetada para facilitar a gestão de participantes em eventos presenciais. Com esta ferramenta, os organizadores podem cadastrar eventos e disponibilizar uma página pública para inscrições. Os participantes, por sua vez, podem se inscrever, emitir uma credencial de inscrição e realizar o check-in no dia do evento.

## Funcionalidades 🛠️

- [x] **Cadastro de Evento:** Organizadores podem facilmente cadastrar novos eventos, fornecendo detalhes como título, data, localização e número máximo de participantes.
  
- [x] **Visualização de Dados do Evento:** Os organizadores têm acesso às informações detalhadas de cada evento, incluindo a lista de participantes inscritos.
  
- [x] **Inscrição de Participantes:** Participantes podem se inscrever nos eventos disponíveis, garantindo sua vaga por meio de um processo simples e intuitivo.
  
- [x] **Emissão de Crachá de Inscrição:** Uma vez inscritos, os participantes podem gerar um crachá de inscrição personalizado, contendo informações relevantes sobre o evento.
  
- [x] **Check-in no Evento:** No dia do evento, os participantes podem realizar o check-in apresentando seu crachá de inscrição, agilizando o processo de entrada.

## Regras de Negócio 📝

- [x] **Restrição de Inscrição:** Cada participante só pode se inscrever uma única vez em cada evento e apenas se houver vagas disponíveis.
  
- [x] **Restrição de Check-in:** O check-in só pode ser realizado uma única vez por participante em cada evento.

## Requisitos Não-funcionais 🚀

- [x] **Check-in via QRCode:** A verificação da presença dos participantes será feita por meio de um código QR gerado no crachá de inscrição.

## Documentação da API (Swagger) 📚

A documentação detalhada da API está disponível no formato Swagger, facilitando a compreensão e integração com outros sistemas.

## Banco de Dados 💾

O AppNodejs utiliza um banco de dados relacional (SQL) para armazenar os dados dos eventos e participantes. No ambiente de desenvolvimento, é utilizado o SQLite devido à sua facilidade de configuração e utilização.
