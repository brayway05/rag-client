

## Client: React + TypeScript + Vite + [TailwindCSS](https://tailwindcss.com/)

*Vite is a speedy Javacript bundler for building the React app

Commands to develop locally:

`npm install`

`npm run dev`

`docker run -p 8080:80 -d rag-client`

## Server: FastAPI


## DB: [PostgreSQL Server](https://github.com/brayway05/RAG-postgres-server)
- PG Vector for document embeddings
- Might use for simple user and chatbot logs


## Docker Compose for Full Stack Dev

`docker compose up --build`


## Document Embeddings

To add personal information that the model will use for augmented output, add a .txt file in database/documents and run the embed_insert.py script. See the [README](https://github.com/brayway05/rag-project/blob/main/database/README.md) in the database directory.
