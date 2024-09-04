const GerenciadorDeTarefas = require("../src/Trabalho01Turma01");

describe("Gerenciador de Tarefas", () => {
  let gerenciador;

  beforeEach(() => {
    gerenciador = new GerenciadorDeTarefas();
  });

  test("Deve adicionar uma tarefa com sucesso e contar a quantidade de tarefas", () => {
    const tarefa = { id: 1, descricao: "Estudar Jest" };
    gerenciador.adicionarTarefa(tarefa);
    expect(gerenciador.contarTarefas()).toBe(1);
  });

  test("Deve lançar erro ao adicionar tarefa com descrição curta", () => {
    const tarefa = { id: 1, descricao: "A" };
    expect(() => gerenciador.adicionarTarefa(tarefa)).toThrow(
      "Erro ao cadastrar tarefa"
    );
  });

  test("Deve remover uma tarefa com sucesso", () => {
    const tarefa = { id: 1, descricao: "Estudar Jest" };
    gerenciador.adicionarTarefa(tarefa);
    gerenciador.removerTarefa(1);
    expect(gerenciador.contarTarefas()).toBe(0);
  });

  test("Deve buscar uma tarefa pelo id", () => {
    const tarefa = { id: 1, descricao: "Estudar Jest" };
    gerenciador.adicionarTarefa(tarefa);
    const encontrada = gerenciador.buscarTarefaPorId(1);
    expect(encontrada).toEqual(tarefa);
  });

  test("Deve listar todas as tarefas", () => {
    const tarefa1 = { id: 1, descricao: "Estudar Jest" };
    const tarefa2 = { id: 2, descricao: "Estudar TypeScript" };
    gerenciador.adicionarTarefa(tarefa1);
    gerenciador.adicionarTarefa(tarefa2);
    expect(gerenciador.listarTarefas()).toEqual([tarefa1, tarefa2]);
  });

  test("Deve marcar uma tarefa como concluída", () => {
    const tarefa = { id: 1, descricao: "Estudar Jest", concluida: false };
    gerenciador.adicionarTarefa(tarefa);
    gerenciador.marcarTarefaComoConcluida(1);
    expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(true);
  });

  test("Deve tentar marcar uma tarefa como concluída que não existe", () => {
    const tarefa = { id: 1, descricao: "Estudar Jest", concluida: false };
    gerenciador.marcarTarefaComoConcluida(2);
    expect(gerenciador.buscarTarefaPorId(2)).toBeUndefined();
  });

  test("Deve listar tarefas concluídas", () => {
    const tarefa = { id: 1, descricao: "Estudar Jest", concluida: true };
    gerenciador.adicionarTarefa(tarefa);
    expect(gerenciador.listarTarefasConcluidas()).toEqual([tarefa]);
  });

  test("Deve atualizar uma tarefa existente", () => {
    const tarefa = { id: 1, descricao: "Estudar Jest" };
    gerenciador.adicionarTarefa(tarefa);
    gerenciador.atualizarTarefa(1, { descricao: "Estudar Node.js" });
    expect(gerenciador.buscarTarefaPorId(1).descricao).toBe("Estudar Node.js");
  });

  test("Deve tentar atualizar uma tarefa que não existe", () => {
    const tarefa = { id: 1, descricao: "Estudar Jest" };
    gerenciador.atualizarTarefa(2, { descricao: "Estudar Node.js" });
    expect(gerenciador.buscarTarefaPorId(2)).toBeUndefined();
  });

  test("Deve listar tarefas pendentes", () => {
    const tarefa1 = { id: 1, descricao: "Estudar Jest", concluida: true };
    const tarefa2 = {
      id: 2,
      descricao: "Estudar TypeScript",
      concluida: false,
    };

    gerenciador.adicionarTarefa(tarefa1);
    gerenciador.adicionarTarefa(tarefa2);

    expect(gerenciador.listarTarefasPendentes()[0].id).toEqual(tarefa2.id);
  });

  test("Deve listar tarefas pendentes", () => {
    const tarefa1 = {
      id: 1,
      descricao: "Estudar Jest",
      pendente: true,
      concluida: false,
    };
    const tarefa2 = {
      id: 2,
      descricao: "Estudar TypeScript",
      pendente: false,
      concluida: true,
    };
    gerenciador.adicionarTarefa(tarefa1);
    gerenciador.adicionarTarefa(tarefa2);
    expect(gerenciador.listarTarefasConcluidas()[0].id).toEqual(tarefa2.id);
  });

  test("Deve adicionar tag da tarefa", () => {
    const tarefa = { id: 1, descricao: "Estudar Jest" };
    gerenciador.adicionarTarefa(tarefa);
    gerenciador.adicionarTagATarefa(1, "Javascript");
    expect(gerenciador.listarTarefasPorTag("Javascript")[0].tags).toEqual([
      "Javascript",
    ]);
  });

  test("Deve tentar adicionar tag da tarefa que não existe", () => {
    const tarefa = { id: 1, descricao: "Estudar Jest" };
    gerenciador.adicionarTagATarefa(2, "Javascript");
    expect(gerenciador.buscarTarefaPorId(2)).toBeUndefined();
  });

  test("Deve remover tag da tarefa", () => {
    const tarefa = { id: 1, descricao: "Estudar Jest", tags: ["Javascript"] };
    gerenciador.adicionarTarefa(tarefa);
    gerenciador.removerTagDaTarefa(1, "Javascript");
    expect(gerenciador.listarTarefasPorTag("Javascript").length).toEqual(0);
  });

  test("Deve tentar remover tag da tarefa que não existe", () => {
    const tarefa = { id: 1, descricao: "Estudar Jest", tags: ["Javascript"] };
    gerenciador.removerTagDaTarefa(2, "Javascript");
    expect(gerenciador.buscarTarefaPorId(2)).toBeUndefined();
  });

  test("Deve listar tarefas por data", () => {
    const tarefa1 = { id: 1, descricao: "Estudar Jest", data: "2023-01-01" };
    const tarefa2 = {
      id: 2,
      descricao: "Estudar TypeScript",
      data: "2023-01-02",
    };
    gerenciador.adicionarTarefa(tarefa1);
    gerenciador.adicionarTarefa(tarefa2);
    expect(gerenciador.buscarTarefasPorData("2023-01-01")[0].id).toEqual(
      tarefa1.id
    );
  });

  test("Deve atualizar prioridade da tarefa", () => {
    const tarefa = { id: 1, descricao: "Estudar Jest", prioridade: 1 };
    gerenciador.adicionarTarefa(tarefa);
    gerenciador.atualizarPrioridade(1, 2);
    expect(gerenciador.buscarTarefaPorId(1).prioridade).toEqual(2);
  });

  test("Deve tentar atualizar prioridade com uma tarefa que não existe", () => {
    const tarefa = { id: 1, descricao: "Estudar Jest", prioridade: 1 };
    gerenciador.atualizarPrioridade(2, 2);
    expect(gerenciador.buscarTarefaPorId(2)).toBeUndefined();
  });

  test("Deve listar tarefas por prioridade", () => {
    const tarefa1 = { id: 1, descricao: "Estudar Jest", prioridade: 1 };
    const tarefa2 = { id: 2, descricao: "Estudar TypeScript", prioridade: 2 };
    gerenciador.adicionarTarefa(tarefa1);
    gerenciador.adicionarTarefa(tarefa2);
    expect(gerenciador.listarTarefasPorPrioridade(1)[0].id).toEqual(tarefa1.id);
  });

  test("Deve contar tarefas por prioridade", () => {
    const tarefa1 = { id: 1, descricao: "Estudar Jest", prioridade: 1 };
    const tarefa2 = { id: 2, descricao: "Estudar TypeScript", prioridade: 2 };
    gerenciador.adicionarTarefa(tarefa1);
    gerenciador.adicionarTarefa(tarefa2);
    expect(gerenciador.contarTarefasPorPrioridade(1)).toEqual(1);
  });

  test("Deve marcar todas as tarefas como concluídas", () => {
    const tarefa1 = { id: 1, descricao: "Estudar Jest", concluida: false };
    const tarefa2 = {
      id: 2,
      descricao: "Estudar TypeScript",
      concluida: false,
    };
    gerenciador.adicionarTarefa(tarefa1);
    gerenciador.adicionarTarefa(tarefa2);
    gerenciador.marcarTodasComoConcluidas();
    expect(gerenciador.listarTarefasConcluidas().length).toEqual(2);
  });

  test("Deve reabrir uma tarefa", () => {
    const tarefa = { id: 1, descricao: "Estudar Jest", concluida: false };
    gerenciador.adicionarTarefa(tarefa);
    gerenciador.reabrirTarefa(1);
    expect(gerenciador.buscarTarefaPorId(1).concluida).toEqual(false);
  });

  test("Deve tentar reabrir uma tarefa que não existe", () => {
    gerenciador.reabrirTarefa(2);
    expect(gerenciador.buscarTarefaPorId(2)).toBeUndefined();
  });

  test("Deve ordenar tarefas por data", () => {
    const tarefa1 = { id: 1, descricao: "Estudar Jest", data: "2023-01-01" };
    const tarefa2 = {
      id: 2,
      descricao: "Estudar TypeScript",
      data: "2023-01-02",
    };
    gerenciador.adicionarTarefa(tarefa1);
    gerenciador.adicionarTarefa(tarefa2);
    gerenciador.ordenarTarefasPorData();
    expect(gerenciador.listarTarefas()[1].data).toEqual("2023-01-02");
  });

  test("Deve ordenar tarefas por prioridade", () => {
    const tarefa1 = { id: 1, descricao: "Estudar Jest", prioridade: 1 };
    const tarefa2 = { id: 2, descricao: "Estudar TypeScript", prioridade: 2 };
    gerenciador.adicionarTarefa(tarefa1);
    gerenciador.adicionarTarefa(tarefa2);
    gerenciador.ordenarTarefasPorPrioridade();
    expect(gerenciador.listarTarefas()[1].prioridade).toEqual(2);
  });

  test("Deve remover tarefas concluídas", () => {
    const tarefa1 = { id: 1, descricao: "Estudar Jest", concluida: true };
    const tarefa2 = { id: 2, descricao: "Estudar TypeScript", concluida: true };
    gerenciador.adicionarTarefa(tarefa1);
    gerenciador.adicionarTarefa(tarefa2);
    gerenciador.removerTarefasConcluidas();
    expect(gerenciador.contarTarefas()).toEqual(0);
  });

  test("Deve buscar tarefa por descrição", () => {
    const tarefa1 = { id: 1, descricao: "Estudar Jest" };
    const tarefa2 = { id: 2, descricao: "Estudar TypeScript" };
    gerenciador.adicionarTarefa(tarefa1);
    gerenciador.adicionarTarefa(tarefa2);
    expect(gerenciador.buscarTarefaPorDescricao("Estudar Jest")[0].id).toEqual(
      tarefa1.id
    );
  });
});
