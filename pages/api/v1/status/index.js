import database from "../../../../infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 as SUM;");
  console.log(result.rows);
  response
    .status(200)
    .json({ chave: "Valor: Alunos do curso.dev são pessoas acima da média!" });
}

export default status;
