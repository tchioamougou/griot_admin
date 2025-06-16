/**
 *  @author Styves daudet(Styves@griot.cm)
 *  @description: this javascript file is used to manage products. product creation, update, delete
 *  @Init_date:  02/02/2023
 *  @last_modify_date: 02/02/03
 *  @last_Modify_By:  styves daudet
 */
import Stripe from "stripe";
export const stripe = new Stripe(import.meta.env.VITE_APP_STRIPE_KEY, {});
/**
 *  @param product :  is the object that contains about the project user want to create for more details about the nature of data go to stripe site
 *  @param options : is the options of creation for the products: for the nature of data, go to stripe site.
 *  @returns return the promise with the details about the response of stripe. this function will return the error or the success data return by stripe.
 *  @description  https://stripe.com/docs/api/products/object
 * */
export const createNewProduct = (product:any) => {
  return new Promise((resolve, reject) => {
    stripe.products
      .create(product)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
/**
 *  @param id: product id
 *  @param product:  is the object that contains about the project user want to update for more details about the nature of data go to stripe site
 *  @param options: is the options of modification for the products: for the nature of data, go to stripe site.
 *  @returns return the promise with the details about the response of stripe. this function will return the error or the success data return by stripe.
 *  @description  https://stripe.com/docs/api/products/object
 * */
const updateProduct = (id:string, product:any, options = {}) => {
  return new Promise((resolve, reject) => {
    stripe.products
      .update(id, product, options)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
/**
 *  @param params: contains the list of filter necessary for make the query
 *  @param options:
 *  @return this function return a Promise that will contain and error or a list of product.
 *  @description   get all products function will mke a callout to stripe and get the list of product, base on the product param contain
 */
const getAllProduct = (params:any, options = {}) => {
  return new Promise((resolve, reject) => {
    stripe.products
      .list(params, options)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
/**
 *  @param params:  contains the list of filter necessary for make the query
 *  @param options:
 *  @return this function return a Promise that will contain and error or a list of products.
 *  @description   get all products function will mke a callout to stripe and get the list of product, base on the product param contain
 */

const search = (params:any, options = {}) => {
  return new Promise((resolve, reject) => {
    stripe.products
      .search(params, options)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 *  @param params:  product id, price, and currency
 *  @param options:
 *  @return
 *  @description   create price
 */
export const createPrice = (productId:string,currency:any, price:any, recurring:any)=>{
 let priceP:any = {
   unit_amount: price, // set your product price here, in cents
   currency: currency, // set your currency here
   product: productId, // set the id of the product created above
 }
 if(recurring){
   priceP.recurring= {interval: 'month'};
 }
  return new Promise((resolve, reject) => {
    stripe.prices
        .create(priceP)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
  });
}
export default { createNewProduct, updateProduct, getAllProduct, search };
/**
 *  @param params: this function is used to create coupons
 *  @return
 *  @description   create coupons
 */
export const createCoupon =(params:any)=>{
    return new Promise((resolve, reject) => {
        stripe.coupons.create(params)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
/**
 *  @param params: this function is used to create coupons
 *  @return
 *  @description   create Promotions Codes.
 */
export const createPromotionCode=(params:any)=>{
    return new Promise((resolve, reject) => {
        stripe.promotionCodes.create(params)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export const getListOfCoupon=()=>{
    stripe.coupons.list().then((data)=>{
        console.log('record List of coupon', data);
    })
}

