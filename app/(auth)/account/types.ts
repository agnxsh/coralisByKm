export interface CustomerAddress {
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
}

export interface OrderNode {
  id: string;
  name: string;
  processedAt: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
}

export interface CustomerOrders {
  nodes: OrderNode[];
}

export interface CustomerData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  acceptsMarketing: boolean;
  createdAt: string;
  defaultAddress?: CustomerAddress;
  orders: CustomerOrders;
}

export interface CustomerResponse {
  success: boolean;
  customer?: CustomerData;
  message?: string;
} 