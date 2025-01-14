import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  console.log(responseBody);
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1
        style={{
          color: "#323437",
          textAlign: "center",
        }}
      >
        Status – Clone TabNews
      </h1>
      <UpdateAt />
    </>
  );
}

function UpdateAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText,
    databaseVersionText,
    databaseMaxConnectionsText,
    databaseOpenedConnectionsText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.update_at).toLocaleString("pt-BR");
    databaseVersionText = data.dependencies.database.version;
    databaseMaxConnectionsText = data.dependencies.database.max_connections;
    databaseOpenedConnectionsText =
      data.dependencies.database.opened_connections;
  }

  return (
    <div>
      <hr />
      <p
        style={{
          color: "#323437",
          fontFamily: "monospace",
          textAlign: "center",
        }}
      >
        Última atualização: {updatedAtText}
      </p>
      <hr />
      <div
        id="UPDATED-STATUS"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          padding: "15px",
        }}
      >
        <div
          id="DB-STATUS"
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "monospace",
            padding: "20px",
            background: "#323437",
            color: "#d1d0c5",
            border: "solid thick #d1d0c5",
            borderRadius: "15px",
          }}
        >
          <h2 style={{ color: "#e2b714" }}>Banco de Dados:</h2>
          <p>
            <strong>Versão: </strong>
            <span style={{ color: "#f28b54" }}>{databaseVersionText}</span>
          </p>
          <p>
            <strong>Limite de conexões: </strong>
            <span style={{ color: "#a1f7b5" }}>
              {databaseMaxConnectionsText}
            </span>
          </p>
          <p>
            <strong>Conexões abertas: </strong>
            <span style={{ color: "#a1f7b5" }}>
              {databaseOpenedConnectionsText}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
//
