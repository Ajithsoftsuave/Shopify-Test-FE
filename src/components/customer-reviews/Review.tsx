import React from "react";
import { Stars } from "./Stars";

interface ReviewProps {
  name: string;
  review: string;
  index: number;
}

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

export const Review: React.FC<ReviewProps> = ({ name, review, index }) => {
  const imageSrc = storeData?.ReviewIconReplace
    ? `${storeData.ShopID}/assets/review_icon${index + 1}.jpg`
    : `${storeData?.ShopID}/assets/review_icon.jpg`;
  return (
    <>
      <div className="flex items-start mt-10">
        {storeData?.ReviewIconReplace && storeData.ReviewIconReplace ? (
          <img
            alt="img"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full"
            src={imageSrc}
          />
        ) : (
          <img
            alt="img"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full"
            src="https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg"
          />
        )}
        <div className="ml-2">
          <div className="flex">
            <Stars />
            <div className="flex items-center">
              <p className="font-bold text-md ml-1">-{name}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-1">✔︎</span>
            <div className="font-bold text-sm">VERIFIED BUYER</div>
          </div>
          <dt className="text-gray-600 text-sm">&quot;{review}&quot;</dt>
        </div>
      </div>
    </>
  );
};
