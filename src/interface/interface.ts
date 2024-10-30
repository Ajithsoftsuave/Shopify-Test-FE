export interface LineItem {
  ID: string;
  Name: string;
  Subtitle: string;
  ProductID: string;
  VariantID: string;
  Quantity: number;
  OriginalPrice: string;
  UnitPrice: string;
  SalePrice: string;
  TotalPrice: string;
  OnSale: boolean;
  Properties: Properties;
  ImageURL: string;
  IsUpsell: boolean;
}

export interface Properties {
  property1: string;
  property2: string;
}

export interface ShippingMethod {
  ID: string;
  Name: string;
  Description: string;
  Price: string;
  DiscountedPrice: string;
}

export interface Cart {
  AvailableShippingMethods?: ShippingMethod[];
  ID: string;
  Version: number;
  CreatedAt: string;
  UpdatedAt: string;
  LineItems: LineItem[];
  StoreID: string;
  ChannelID: string;
  HasSubscription: boolean;
  Status: string;
  IPAddress: string;
  TrafficSource: string;
  OriginalCartID: string;
  Email: string | null;
  PhoneNumber: string | null;
  ShippingRequired: boolean;
  ShippingMethodID: string;
  ShippingAddress: ShippingAddress;
  SubtotalAmount: string;
  Fees: Fees;
  CartDiscounts: CartDiscounts[];
  TotalAmount: string;
}

interface Fees {
  shipping: {
    OriginalCost: string;
    DiscountedCost: string;
  };
}

export interface CartDiscounts {
  Code: string;
  Amount: string;
  Reason: string;
}

export interface ShippingAddress {
  FirstName: string;
  LastName: string;
  Address1: string;
  Address2: string;
  Organization: string;
  City: string;
  ProvinceCode: string;
  Zip: string;
  CountryCode: string;
}

export interface IStoreContext {
  state: {
    storeData: Shop | null;
    shopUrl: string;
    storePhone: string;
    storeEmail: string;
  };
}

export interface Shop {
  CheckoutURL?: string;
  CustomerServiceNumber: string;
  CustomerServiceEmail: string;
  Name: string;
  PaymentGateway?: string;
  PublicPaymentToken?: string;
  ShopID: string;
  StoreID?: string;
  ShopURL?: string;
  AltShopURL?: string;
  VipURL?: string;
  StoreDescription: string;
  VIPOnly?: boolean;
  CustomerReviews?: CustomerReview[];
  ReviewIconReplace?: boolean;
  Timer?: Timer;
  VipClubInfo?: VipClubInfo;
  LogoWidth?: number;
  LogoHeight?: number;
  TermDefaultChecked?: boolean;
  TermsAndSubscription?: {
    headingBoldText?: string;
    headingNormalText?: string;
    heading?: string;
    terms_1: string;
    terms_2: string;
    terms_3: string;
    terms_4: string;
  };
  FlowVariants?: { [key: string]: number };
  Flow?: { [key: number]: { [productID: string]: FlowData } };
}

export interface CustomerReview {
  id: number;
  name: string;
  review: string;
}
export interface Timer {
  interval: number;
  saleText?: string;
  bodyText: string;
}

export interface VipClubInfo {
  title?: string;
  description?: string;
  vipClubBenefitTitle: string;
  vipClubBenefits: string[];
  cancellation_1?: string;
  cancellation_2?: string;
}

export interface FlowData {
  designCode?: string;
  headerTitle?: string;
  headerCaption?: string;
  accept?: {
    nextProduct?: string;
  };
  decline?: {
    nextProduct?: string;
  };
}

export interface IContact {
  email: string;
  last_name?: string;
  first_name?: string;
  id?: number;
}

export interface Address {
  first_name: string;
  last_name: string;
  address1: string;
  phone: string;
  city: string;
  province: string;
  country: string;
  zip: string;
}

export interface IFormContext {
  CustomerData: IContact;
  BillingAddress: Address;
  Shipping: Address;
  billing_same_as_shipping: boolean;
}

export interface IGetCartBody {
  cartID: string;
  shopID: string;
}

export interface IGetSessionBody {
  ttl: number;
  statements: {
    permissions: string[];
    constraints: {
      merchant: {
        merchant_id: string;
      };
    };
  }[];
}

export interface ApiResponse {
  status: string;
  data: {
    session_id: string;
    session_key: string;
    statements: Statement[];
    expires_at: string;
  };
  errors: any | null;
}

interface Statement {
  permissions: string[];
  constraints: {
    merchant: {
      merchant_id: string;
    };
    platform: {
      platform_id: string;
    };
  };
}

export interface IGetPayingConfigBody {
  currency_code: string;
  merchant_id: string;
  idempotency_key: string;
  amount: number;
}

export interface ApiPayConfigResponse {
  status: string;
  data: {
    payin_config_id: string;
    payment_method_config_id: string;
    merchant_id: string;
    merchant: Merchant;
    idempotency_key: string;
    amount: number;
    currency_code: string;
    amount_splits: any[]; // Adjust if the array has a specific structure
    allow_partial_authorization: boolean;
    billing_contact: BillingContact;
    level_2_3: any | null;
    metadata: Record<string, any>;
    method_metadata: Record<string, any>;
    supported_capabilities: any | null;
    threeds_mode: string;
    payin: any | null;
  };
  errors: any | null;
}

interface Merchant {
  id: string;
  name: string;
  dba_name: string;
}

interface BillingContact {
  name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  email: string;
  phone: string;
}

export interface ApiErrorResponse {
  status: string;
  data: null;
  errors: any;
}

export interface CostSummary {
  SubtotalAmount: string;
  CartDiscounts: {
    Amount: string;
    Code: string;
    Reason: string;
  }[];
  Fees: {
    [property: string]: Fees["shipping"];
  };
  TotalAmount: string;
}

export interface IObject {
  ID: string;
  Name: string;
}

export interface ICart {
  AvailableShippingMethods: ShippingMethod[];
  ID: string;
  Version: number;
  CreatedAt: string;
  UpdatedAt: string;
  LineItems: LineItem[];
  CostSummary: CostSummary;
  StoreID: string;
  ChannelID: string;
  Channel: IObject;
  Store: IObject;
  HasSubscription: boolean;
  Status: string;
  IPAddress: string;
  TrafficSource: string;
  OriginalCartID: string;
  Email: string | null;
  PhoneNumber: string | null;
  ShippingRequired: boolean;
  ShippingMethodID: string;
  ShippingAddress: Address;
  SubtotalAmount: string;
  Fees: Fees;
  CartDiscounts: CostSummary["CartDiscounts"];
  TotalAmount: string;
}

interface IPaymentDetils {
  kind: string;
  status: string;
  amount: string;
}

export interface IPaymentBody extends IGetCartBody {
  shippingAddress: Address;
  billingAddress: Address;
  customerDetails: IContact;
  paymentDetail: IPaymentDetils;
}


export interface IShippingAddressUpdate {
  address1: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  firstName: string;
  lastName: string;
}
export interface IShippingAddress {
  cartId: string;
  checkoutId?:string;
  shippingAddress: IShippingAddressUpdate;
  email: string;
  lineItems?: {
    variantId: string;
    quantity: number;
  }[];
}

export interface IShippingAddressPayload {
  deliveryAddress: IShippingAddress,
  shopId: string
}