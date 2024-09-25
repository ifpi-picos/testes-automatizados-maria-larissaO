export default class ContaBancaria {
    private numeroConta: number; //número da conta bancária
    private agencia: number; // numero da agencia bancária 
    private saldo: number; // armazena o saldo
    private extrato: string[]; // histórico das operações realizadas

    public constructor (){ //o this serve para acessar o que está dentro dos private
        this.numeroConta = Math.floor(Math.random()) 
        this.agencia = 0;
        this.saldo = 0;
        this.extrato = [];
    }
    public depositar(valor : number){
        if (valor > 0) {
            this.saldo += valor 
            this.registrarOperacao (`valor depositado é :${ valor}`)

     }
    }
     public sacar(valor: number) {
        if (this.saldo >= valor){
            this.saldo -= valor;
            this.registrarOperacao(`Saque: R$${valor}`);
            return valor;
        } 
        throw new Error("Saldo insuficiente");
     }
    
    
     public transferir(valor: number, contaDestino: ContaBancaria){
        if (this.saldo >= valor){
            this.saldo -= valor;
            contaDestino.depositar(valor);
            this.registrarOperacao(`Transferencia: R$${valor} para conta ${contaDestino.numeroConta}`);
        } else {
            throw new Error("Saldo insuficiente");
        }
     }

     public consultarSaldo() {
        return this.saldo;
     }

    

    public exibirExtrato() {
      return this.extrato.join('\n')
    }
  
    private registrarOperacao(descricao: string) {
      const data = new Date().toISOString();
      this.extrato.push(`${data} - ${descricao}`);
    }
}
  