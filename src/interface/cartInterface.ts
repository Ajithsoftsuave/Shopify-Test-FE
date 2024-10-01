export interface Cart {
  id: string;
  discountCodes: DiscountCode[];
  attributes: Attribute[];
  buyerIdentity: BuyerIdentity;
  checkoutUrl: string;
  createdAt: string;
  discountAllocations: DiscountAllocation[];
  cost: Cost;
  note: string;
  updatedAt: string;
  lines: CartLineConnection;
}

export interface DiscountCode {
  code?: string; // Add relevant fields if necessary
}

export interface Attribute {
  key?: string;
  value?: string;
}

export interface BuyerIdentity {
  countryCode: string;
  email: string | null;
  phone: string | null;
}

export interface DiscountAllocation {
  discountedAmount: Money;
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Cost {
  subtotalAmount: Money;
  totalAmount: Money;
  totalTaxAmount: Money | null;
  totalDutyAmount: Money | null;
}

export interface CartLineConnection {
  edges: CartLineEdge[];
}

export interface CartLineEdge {
  node: CartLine;
}

export interface CartLine {
  id: string;
  quantity: number;
  cost: LineCost;
  discountAllocations: DiscountAllocation[];
  merchandise: Merchandise;
}

export interface LineCost {
  amountPerQuantity: Money;
  compareAtAmountPerQuantity: Money | null;
  subtotalAmount: Money;
  totalAmount: Money;
}

export interface Merchandise {
  id: string;
  title: string;
  price: Money;
  compareAtPrice: Money | null;
  image: Image;
  product: Product;
  sku: string;
  requiresShipping: boolean;
  selectedOptions: SelectedOption[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Product {
  id: string;
  title: string;
  featuredImage: Image;
  description: string;
  handle: string;
}

export interface SelectedOption {
  name: string;
  value: string;
}
