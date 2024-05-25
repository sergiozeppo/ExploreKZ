import { IAddress } from './typesProfile';

export type CustomerUpdateAction =
    | { action: 'setFirstName'; firstName: string }
    | { action: 'setLastName'; lastName: string }
    | { action: 'changeEmail'; email: string }
    | { action: 'setDateOfBirth'; dateOfBirth: string }
    | { action: 'changeAddress'; addressId: string; address: IAddress }
    | { action: 'setDefaultShippingAddress'; addressId: string }
    | { action: 'setDefaultBillingAddress'; addressId: string };

export interface CustomerUpdate {
    version: number;
    actions: CustomerUpdateAction[];
}
