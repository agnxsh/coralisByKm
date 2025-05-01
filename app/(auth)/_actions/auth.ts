// app/actions/createCustomer.ts

'use server';

import { createCustomerMutation, getCustomerQuery, loginMutation } from './queries';

const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN;
const endpoint = process.env.NEXT_PUBLIC_API_URL!;


type CustomerCreateInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

type CustomerLoginInput = {
  email: string;
  password: string;
};

//----------------------------------------------------//
//                Create Customer                     //
//----------------------------------------------------//
export async function createCustomer(input: CustomerCreateInput) {
    try{
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
          },
          body: JSON.stringify({
            query: createCustomerMutation,
            variables: { input },
          }),
        });
        const result = await response.json();
        console.log(result);
        return result.data.customerCreate;
    } catch (error) {
        console.error('Error creating customer:', error);
        return { success: false, message: 'An error occurred while creating the customer.' };
    }
}


//----------------------------------------------------//
//                Login Customer                      //
//----------------------------------------------------//
export async function loginCustomer(input: CustomerLoginInput) {
    try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
          },
          body: JSON.stringify({
            query: loginMutation,
            variables: { input },
          }),
        });
        
        const result = await response.json();
        
        if (result.data?.customerAccessTokenCreate?.customerAccessToken) {
            // Successfully logged in
            return { 
                success: true, 
                accessToken: result.data.customerAccessTokenCreate.customerAccessToken.accessToken,
                expiresAt: result.data.customerAccessTokenCreate.customerAccessToken.expiresAt
            };
        } else {
            // Login failed with errors
            const errors = result.data?.customerAccessTokenCreate?.customerUserErrors || [];
            return { 
                success: false, 
                message: errors.length > 0 ? errors[0].message : 'Login failed',
                errors: errors
            };
        }
    } catch (error) {
        console.error('Error logging in customer:', error);
        return { 
            success: false, 
            message: 'An error occurred while logging in.' 
        };
    }
}



//----------------------------------------------------//
//                Get Customer Details                //
//----------------------------------------------------//
export async function getCustomerDetails(customerAccessToken: string) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: getCustomerQuery,
        variables: { customerAccessToken },
      }),
    });

    const result = await response.json();

    if (result.data?.customer) {
      return { success: true, customer: result.data.customer };
    } else {
      return { success: false, message: 'Customer not found' };
    }
  } catch (error) {
    console.error('Error fetching customer details:', error);
    return { success: false, message: 'An error occurred while fetching customer details' };
  }
}