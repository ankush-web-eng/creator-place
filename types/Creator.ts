import { User, Bank, Address, CreatorStore } from "@prisma/client";

export interface Creator extends User {
    CreatorStore: CreatorStore;
    Bank: Bank;
    Address: Address;
}