export interface FavoriteState {

  byCustomer: Record<
    string,
    string[]
  >;

}

// بهترین State برای Redux این است:
// یعنی

// {
//     "customer-1": [
//         "pizza",
//         "burger",
//         "cola"
//     ],

//     "customer-2": [
//         "cake"
//     ]
// }