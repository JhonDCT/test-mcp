import {WorksheetId} from './worksheet-id.value-object';

export class Worksheet {
  private id?: WorksheetId;
  private customerId: string;
  private accountId: string;

  constructor(id: WorksheetId, customerId: string, accountId: string) {
    this.id = id;
    this.customerId = customerId;
    this.accountId = accountId;
  }
}
