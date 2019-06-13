export class RetornoBusca {
    public plataforma: String;
    public tempoPrevisto: Number;
    public tempoViagem: String;
    public categoria: Number;
    public valor: Number;
    public guidSolicitacao: String;

    constructor(plataforma: String, valor: Number, tempoPrevisto: number, tempoViagem: number, categoria: Number, guidSolicitacao: String) {
        this.tempoPrevisto = tempoPrevisto;
        this.categoria = categoria;
        this.valor = valor;
        this.plataforma = plataforma;
        var timeObject = new Date();
        timeObject = new Date(timeObject.getTime() + (1000 * (tempoViagem + tempoPrevisto)));
        this.tempoViagem = timeObject.toLocaleDateString() + " " + timeObject.toLocaleTimeString();
        this.guidSolicitacao = guidSolicitacao;
    }
}
