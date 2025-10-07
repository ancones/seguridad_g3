// Selecciona la base de datos (se crea automáticamente si no existe)
const db = db.getSiblingDB('myapp');

// Crea la colección 'users' si no existe
if (!db.getCollectionNames().includes('users')) {
  db.createCollection('users');
}

// Inserta el documento inicial
db.users.insertOne({
  username: 'admin',
  roles: { User: 2001, Admin: 5150, Editor: 1984 },
  password: '2GeIZjDelsOjv7ogyat4M.cfIVExcT780kvt9r8QWRCNLMF.qjg/q',
  __v: 0
});
