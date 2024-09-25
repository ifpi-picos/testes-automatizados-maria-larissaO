import { beforeEach, describe, expect, test } from "bun:test";
import ContaBancaria from "./ContaBancaria.ts";


describe("Testando ContaBancaria", () => {
  let conta: ContaBancaria;

  beforeEach(() => {
    conta = new ContaBancaria();
  });

  test("Depositar valor positivo", () => {
    conta.depositar(100);
    expect(conta.consultarSaldo()).toBe(100);
  });

  test("Depositar valor negativo", () => {
    conta.depositar(-100);
    expect(conta.consultarSaldo()).toBe(0);
  });

  test("Sacar um valor com saldo suficiente", () => {
    conta.depositar(100);
    expect(conta.sacar(40)).toBe(40);
    expect(conta.consultarSaldo()).toBe(60);
  });

  test("Erro ao sacar com saldo insuficiente", () => {
    conta.depositar(100);
    expect(() => {
      conta.sacar(150);
    }).toThrow("Saldo insuficiente");
    expect(conta.consultarSaldo()).toBe(100);
  });

  test("Transferência entre contas", () => {
    const contaDestino = new ContaBancaria( );
    conta.depositar(100);
    conta.transferir(50, contaDestino);
    expect(conta.consultarSaldo()).toBe(50);
    expect(contaDestino.consultarSaldo()).toBe(50);
  });

  test("Erro ao tentar transferir com saldo insuficiente", () => {
    const contaDestino = new ContaBancaria();
    conta.depositar(100);
    expect(() => {
      conta.transferir(150, contaDestino);
    }).toThrow("Saldo insuficiente");
    expect(conta.consultarSaldo()).toBe(100);
  });

  test("Exibir extrato de operações", () => {
    conta.depositar(200);
    conta.sacar(100);
    const extrato = conta.exibirExtrato();
    expect(extrato).toContain("Depósito: R$200");
    expect(extrato).toContain("Saque: R$100");
  });
});