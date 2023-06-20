import { UniqueIdService } from './unique-id.service';
/* estrutura básica:
describe('O artefato que queremos testar', () => {
  it('condição que queremos testar', () => {});
});
"#" no nome da função é só uma convenção
*/

describe(UniqueIdService.name, () => {

  let service: UniqueIdService = null;

  beforeEach(() => {
    service = new UniqueIdService();
  });


  it(`#${UniqueIdService.prototype.gerarIdComPrefixo.name} deve gerar id quando chamado com prefixo válido`, () => {
    const id = service.gerarIdComPrefixo('teste');
    expect(id.startsWith('teste-')).toBeTrue();
  });

  it(`#${UniqueIdService.prototype.gerarIdComPrefixo.name} não deve gerar id duplicado quando chamdo com mesmo prefixo`, () => {
    const listaId = new Set();  // Set não permite itens duplicados. Não dá erro mas não inclui.

    for (let i = 0; i < 50; i++) {
      listaId.add(service.gerarIdComPrefixo('teste'));
    }

    expect(listaId.size).toBe(50);
  });

  it(`#${UniqueIdService.prototype.getQtdUniqueIds.name} deve retornar o número de ids gerados quando chamado`, () => {
    service.gerarIdComPrefixo('teste');
    service.gerarIdComPrefixo('teste');

    expect(service.getQtdUniqueIds()).toBe(2);
  });

  it(`#${UniqueIdService.prototype.gerarIdComPrefixo.name} deve lançar exceção quando chamado com prefixo inválido`, () => {
    const emptyValues = [null, undefined, '', '0'];

    emptyValues.forEach(value => {
      expect(() => service.gerarIdComPrefixo(value))
                      .withContext(`Valor vazio incorreto: ${value}`)  // indica o valor do array que gerou (ou não gerou no caso) o erro
                      .toThrow();
    });

  });

});
