# Cine Zoom

> Catálogo de filmes com busca, fichas individuais e listagem por popularidade,
> consumindo a API do TMDB.

**[Ver ao vivo](https://cinezoom.vercel.app)** · `React` `Vite` `React Router` `CSS`

---

## O problema

Interface de catálogo tem três estados que quase sempre são tratados tarde:
carregando, vazio e erro. Somado a isso, navegação com URL compartilhável, a
busca precisa sobreviver ao refresh e ao link colado no WhatsApp.

## Decisões de arquitetura

**Roteamento com página de busca própria.**
`Home`, `Movie/:id` e `Search` são rotas de verdade. A consulta vive na URL, então
resultado de busca é compartilhável e o botão voltar funciona como o usuário
espera. Guardar a busca só em estado local teria sido mais rápido e teria quebrado
as duas coisas.

**Hook customizado para o arraste horizontal.**
`useDragScroll` isola o comportamento de rolagem por arraste. Fica reutilizável
entre carrosséis e some do componente de tela, que volta a tratar só de layout.

**Endpoints em variáveis de ambiente.**
Base da API, endpoint de busca e base das imagens são configuráveis. O código não
tem URL do TMDB espalhada.

**CSS por componente, sem framework.**
Cada componente tem seu `.css` ao lado. Em projeto deste porte, a dependência a
mais custaria mais do que resolveria.

## Rodando localmente

```bash
git clone https://github.com/renawmontanari/cine-zoom.git
cd cine-zoom
cp .env.example .env      # preencha com sua chave do TMDB
npm install
npm run dev
```

| Variável | Para que serve |
|---|---|
| `VITE_API_KEY` | Chave da API do TMDB |
| `VITE_API` | Base dos endpoints de filme |
| `VITE_SEARCH` | Endpoint de busca |
| `VITE_IMG` | Base das imagens |

## O que eu faria diferente

**O arquivo `.env` foi versionado com a chave real do TMDB dentro.** O
`.gitignore` não cobria `.env`. A correção completa tem três passos e nenhum é
opcional: revogar a chave no painel do TMDB, adicionar `.env` ao `.gitignore` e
publicar um `.env.example` sem valores. Reescrever o histórico é possível, mas o
que resolve de fato é a revogação, chave que já foi pública deve ser tratada
como comprometida.

**Chave de API no cliente é sempre visível.** Mesmo com variável de ambiente, o
valor vai para o bundle e qualquer pessoa lê no DevTools. A solução correta é uma
rota de servidor que faça o proxy e guarde a chave, no TMDB o risco é baixo, mas
o hábito precisa vir do projeto pequeno.

**Sem tratamento de erro nas requisições.** API fora do ar hoje resulta em tela
branca.

**Sem paginação nem `IntersectionObserver`.** O catálogo termina no primeiro
lote de resultados.

## Licença

MIT
