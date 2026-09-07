import type { Order } from "../types/order";
import type { SubmitOrder } from "../types/order";

export const orderService = {

  async create(
    payload: SubmitOrder
  ): Promise<Order> {

    await new Promise(resolve =>
      setTimeout(resolve, 1000)
    );

    return {

      id: crypto.randomUUID(),

      customerId: payload.customerId,

      tableId: payload.order.tableId,

      items: payload.order.items,

      totalPrice: payload.order.totalPrice,

      status:
        payload.order.status ??
        "pending",

      createdAt:
        new Date().toISOString(),

    };

  },

};


// بعداً فقط می‌شود

// return api.post(...)

