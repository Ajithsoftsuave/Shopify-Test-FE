import React from "react";
import { Review } from "./Review";

const storeData = {
  CheckoutURL: "https://checkout.example.com",
  CustomerServiceNumber: "+1234567890",
  CustomerServiceEmail: "support@example.com",
  Name: "Example Shop",
  PaymentGateway: "Phoenix Gateway 2.0",
  PublicPaymentToken: "public-payment-token-123",
  ShopID: "shop-123",
  StoreID: "store-456",
  ShopURL: "https://shop.example.com",
  AltShopURL: "https://altshop.example.com",
  VipURL: "https://vipshop.example.com",
  StoreDescription: "The best shop for all your needs!",
  VIPOnly: true,
  CustomerReviews: [
    {
      id: 1,
      name: "John Doe",
      review: "Great service and quality products!",
    },
    {
      id: 2,
      name: "Jane Smith",
      review: "Fast shipping and excellent customer support!",
    },
  ],
  ReviewIconReplace: false,
  Timer: {
    interval: 30,
    saleText: "Limited time offer!",
    bodyText: "Hurry up, sale ends soon!",
  },
  VipClubInfo: {
    title: "VIP Club",
    description: "Join our VIP Club for exclusive offers and discounts.",
    vipClubBenefitTitle: "Exclusive Benefits",
    vipClubBenefits: [
      "Free shipping",
      "Priority support",
      "Exclusive discounts",
    ],
    cancellation_1: "Cancel anytime with no extra fees.",
    cancellation_2: "Membership benefits will be lost after cancellation.",
  },
  LogoWidth: 200,
  LogoHeight: 100,
  TermDefaultChecked: true,
  TermsAndSubscription: {
    headingBoldText: "Terms and Conditions",
    headingNormalText: "Please read carefully.",
    heading: "Subscription and Terms",
    terms_1: "By signing up, you agree to our terms.",
    terms_2: "Your subscription will auto-renew every month.",
    terms_3: "You can cancel at any time.",
    terms_4: "Additional charges may apply for certain services.",
  },
  FlowVariants: {
    variant1: 1,
    variant2: 2,
  },
  Flow: {
    1: {
      "product-123": {
        designCode: "design1",
        headerTitle: "Welcome to our shop!",
        headerCaption: "Find your perfect product.",
        accept: { nextProduct: "product-456" },
        decline: { nextProduct: "product-789" },
      },
    },
    2: {
      "product-789": {
        designCode: "design2",
        headerTitle: "Special offer for you!",
        headerCaption: "Don't miss this deal.",
        accept: { nextProduct: "product-101" },
        decline: { nextProduct: "product-202" },
      },
    },
  },
};

export const CustomerReviews: React.FC = () => {
  return (
    <>
      <div className="mt-5 border-gray-200 pt-10 pb-5">
        <div className="flex items-center justify-center">
          <div className="flex-grow border-b border-black mx-2"></div>
          <h2
            id="contact-info-heading"
            className="text-bold text-lg font-medium text-gray-900 text-center"
          >
            Trusted Customer Reviews
          </h2>
          <div className="flex-grow border-b border-black mx-2"></div>
        </div>

        {storeData?.CustomerReviews?.map((r, index) => (
          <Review key={r.id} name={r.name} review={r.review} index={index} />
        ))}
      </div>
    </>
  );
};
