import type { Customer } from "../types/customer";

const STORAGE_KEY = "customers";

export interface StoredCustomers {

    profiles: Record<string, Customer>;

    activeCustomerId: string | null;

}

export function loadCustomers(): StoredCustomers {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data)

        return {

            profiles: {},

            activeCustomerId: null,

        };

    return JSON.parse(data);

}

export function saveCustomers(

    profiles: Record<string, Customer>,

    activeCustomerId: string | null,

) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify({

            profiles,

            activeCustomerId,

        }),

    );

}