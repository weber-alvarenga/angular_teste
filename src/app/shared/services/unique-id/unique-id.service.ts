import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UniqueIdService {

  public qtdUniqueIds = 0;
  private validId = /^[A-Za-z]+[\w\-\:\.]*$/;

  public gerarIdComPrefixo(prefixo: string): string {

    if (!prefixo || !this.validId.test(prefixo)) {
      throw Error('Prefixo não informado.');
    }

    const uniqueId = this.gerarId();

    this.qtdUniqueIds++;

    return `${prefixo}-${uniqueId}`;
  }

  public getQtdUniqueIds(): number {
    return this.qtdUniqueIds;
  }

  private gerarId(): string {
    return uuidv4();  // biblioteca para gerar números únicos
  }
}
