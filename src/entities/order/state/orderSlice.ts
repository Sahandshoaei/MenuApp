import {createAsyncThunk,createSlice,type PayloadAction} from "@reduxjs/toolkit";
import { orderService } from "../services/orderService";
import type { Order,OrderState,OrderStatus,SubmitOrder} from "../types/order";


/* -------------------------------------------------------------------------- */
/*                                   Thunks                                   */
/* -------------------------------------------------------------------------- */

export const submitOrder = createAsyncThunk<
  Order,
  SubmitOrder
>(
  "order/submitOrder",
  async (payload) => {
    return await orderService.create(payload);
  }
);

/* ---------------- LocalStorage ---------------- */

const STORAGE_KEY = "orders";

const loadOrders = (): Pick<
  OrderState,
  "entities" |
    "currentOrderByCustomer" |
    "historyByCustomer"
> => {
  try {
    const data =
      localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return {
        entities: {},
        currentOrderByCustomer: {},
        historyByCustomer: {},
      };
    }

    const parsed = JSON.parse(data) as Partial<OrderState>;

    return {
      entities: parsed.entities ?? {},
      currentOrderByCustomer:
        parsed.currentOrderByCustomer ?? {},
      historyByCustomer:
        parsed.historyByCustomer ?? {},
    };
  } catch {
    return {
      entities: {},
      currentOrderByCustomer: {},
      historyByCustomer: {},
    };
  }
};

const saveOrders = (
  entities: OrderState["entities"],
  currentOrderByCustomer: OrderState["currentOrderByCustomer"],
  historyByCustomer: OrderState["historyByCustomer"]
) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      entities,
      currentOrderByCustomer,
      historyByCustomer,
    })
  );
};

/* -------------------------------------------------------------------------- */
/*                                Initial State                               */
/* -------------------------------------------------------------------------- */

// const initialState: OrderState = {
//   loading: false,

//   success: false,

//   entities: {},

//   currentOrderByCustomer: {},

//   historyByCustomer: {},
// };
const persisted = loadOrders();

const initialState: OrderState = {
  loading: false,
  success: false,
  entities: persisted.entities,
  currentOrderByCustomer:
    persisted.currentOrderByCustomer,
  historyByCustomer:
    persisted.historyByCustomer,
};
/* -------------------------------------------------------------------------- */
/*                                   Slice                                    */
/* -------------------------------------------------------------------------- */

const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {
    updateOrderStatus: (
      state,
      action: PayloadAction<{
        orderId: string;
        status: OrderStatus;
      }>
    ) => {
      const { orderId, status } =
        action.payload;

      const order =
        state.entities[orderId];

      if (!order) return;

      order.status = status;

      saveOrders(
        state.entities,
        state.currentOrderByCustomer,
        state.historyByCustomer
      );
    },

    clearCurrentOrder: (
      state,
      action: PayloadAction<string>
    ) => {
      const customerId =
        action.payload;

      state.currentOrderByCustomer[
        customerId
      ] = null;

      saveOrders(
        state.entities,
        state.currentOrderByCustomer,
        state.historyByCustomer
      );
    },

    clearCustomerOrders: (
      state,
      action: PayloadAction<string>
    ) => {
      const customerId =
        action.payload;

      const history =
        state.historyByCustomer[
          customerId
        ];

      if (history) {
        history.forEach((id) => {
          delete state.entities[id];
        });
      }

      state.historyByCustomer[
        customerId
      ] = [];

      state.currentOrderByCustomer[
        customerId
      ] = null;

      saveOrders(
        state.entities,
        state.currentOrderByCustomer,
        state.historyByCustomer
      );
    },

    removeOrder: (
      state,
      action: PayloadAction<string>
    ) => {
      const orderId =
        action.payload;

      const order =
        state.entities[orderId];

      if (!order) return;

      const customerId =
        order.customerId;

      delete state.entities[
        orderId
      ];

      const history =
        state.historyByCustomer[
          customerId
        ];

      if (history) {
        state.historyByCustomer[
          customerId
        ] = history.filter(
          (id) => id !== orderId
        );
      }

      if (
        state.currentOrderByCustomer[
          customerId
        ] === orderId
      ) {
        state.currentOrderByCustomer[
          customerId
        ] = null;
      }

      saveOrders(
        state.entities,
        state.currentOrderByCustomer,
        state.historyByCustomer
      );
    },

    resetOrderState: (state) => {
      state.loading = false;

      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        submitOrder.pending,
        (state) => {
          state.loading = true;

          state.success = false;
        }
      )

      .addCase(
        submitOrder.fulfilled,
        (
          state,
          action
        ) => {
          state.loading = false;

          state.success = true;

          const order =
            action.payload;

          const customerId =
            order.customerId;

          /* ---------- Entity ---------- */

          state.entities[
            order.id
          ] = order;

          /* ---------- Current Order ---------- */

          state.currentOrderByCustomer[
            customerId
          ] = order.id;

          /* ---------- History ---------- */

          if (
            !state.historyByCustomer[
              customerId
            ]
          ) {
            state.historyByCustomer[
              customerId
            ] = [];
          }

          state.historyByCustomer[
            customerId
          ].unshift(order.id);

          saveOrders(
            state.entities,
            state.currentOrderByCustomer,
            state.historyByCustomer
          );
        }
      )

      .addCase(
        submitOrder.rejected,
        (state) => {
          state.loading = false;

          state.success = false;
        }
      );
  },
});

export const {
  updateOrderStatus,
  clearCurrentOrder,
  clearCustomerOrders,
  removeOrder,
  resetOrderState,
} = orderSlice.actions;



export const orderReducer = orderSlice.reducer;