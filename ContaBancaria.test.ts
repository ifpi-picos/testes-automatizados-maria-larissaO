import { beforeEach, describe, expect, test } from "bun:test";
import ContaBancaria from "./ContaBancaria.ts";

describe("Testando classe ContaBancaria", () => {
  let conta: ContaBancaria;
  let conta2: ContaBancaria;
  beforeEach(() => {
    conta = new ContaBancaria();
    conta2 = new ContaBancaria();
    
  });

  test("Testando depositar valor positivo", () => {
    conta.depositar(100);
    expect(conta.consultarSaldo()).toBe(100);
  });

  test("Testando depositar valor negativo", () => {
    conta.depositar(-100);
    expect(conta.consultarSaldo()).toBe(0);
  });

  test("Deve sacar um valor com saldo suficiente", () => {
    conta.depositar(100);
    expect(conta.sacar(40));
    expect(conta.consultarSaldo()).toBe(60);
  });

  test("Deve lançar um erro ao tentar sacar com saldo insuficiente", () => {
    conta.depositar(100);
    conta.sacar(150);
    expect(conta.consultarSaldo()).toBe(100);
  });

  test("Testando o valor da transferência", () => {
    conta.depositar(100);
    conta.transferencia(50, conta2);
    expect(conta.consultarSaldo()).toBe(50);
    expect(conta2.consultarSaldo()).toBe(50);
  
  })

  test("Testando o extrato", () => {
    conta.depositar(100)
    conta.sacar(20)
    conta.transferencia(30, conta2)
    let data = new Date()
    let retorno = [`Extrato das transacoes - ${data.toLocaleDateString('pt-BR')}`,`Valor depositado: 100.00`, `Valor sacado: 20.00`, `Valor transferido: 30.00 Agência: 3 Número da conta: 2`]
    expect(conta.exibeExtrato()).toEqual(retorno)

  })

});
