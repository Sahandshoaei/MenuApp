import type { Customer } from "../types/customer";
import { useAppDispatch } from "../../../app/store/hooks";
import { useAppSelector } from "../../../app/store/hooks";
import {logout,setActiveCustomer,updateCustomer} from "../state/customerSlice";
import {selectActiveCustomerId,selectCurrentCustomer} from "../state/customerSelector";

export const useCustomer = () => {

    const dispatch = useAppDispatch();

    const customer = useAppSelector(selectCurrentCustomer);

    const customerId = useAppSelector(selectActiveCustomerId);
    

    return {

        customer,

        customerId,

        login(customer: Customer) {

            dispatch(
                setActiveCustomer(
                    customer,
                ),
            );

        },

        logout() {

            dispatch(logout());

        },

        update(customer: Customer) {

            dispatch(
                updateCustomer(
                    customer,
                ),
            );

        },

    };

};

// به جای دو هوک قبلی این مدلی نوشته میشه
// useCurrentCustomer()
// useCustomerId()

// بعد داخل کل پروژه فقط این  استفاده میشه:
// const customer = useCustomer();

// و:

// customer.customer
// customer.customerId
// customer.login(...)
// customer.logout()
// customer.update(...)


// profiles[customer.id]
// activeCustomerId = customer.id;

// دلیلش اینه که شماره تلفن یک ویژگی مشتری
//  است، نه شناسه اصلی او. ممکن است بعداً کاربر
//   شماره‌اش را تغییر دهد یا ورود با ایمیل/شبکه‌های
//    اجتماعی اضافه شود. در این صورت تمام Recordها باید جابه‌جا شوند. اگر
//     از id به‌عنوان کلید استفاده کنی، شناسه همیشه ثابت می‌ماند و فقط مقدار phone داخل
//      پروفایل به‌روزرسانی می‌شود. وقتی Backend اضافه شود هم همین id همان شناسه دیتابیس
//       خواهد بود و نیازی به مهاجرت ساختار State نخواهی داشت. به همین دلیل پیشنهاد می‌کنم ا
//       ز همین حالا این تغییر کوچک را انجام دهی تا بعداً هزینه بازطراحی نداشته باشی.