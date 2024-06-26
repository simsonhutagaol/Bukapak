import React from "react";

const DetailEcommerce = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:order-2">
              <p className="text-lg text-gray-800 leading-relaxed">
                Bukapak is one of the new e-commerce platforms in Indonesia
                Indonesia. Bukapak provides a variety of products ranging from
                daily necessities to unique items from local sellers. Users can
                easily explore thousands of products, make transactions safely,
                and enjoy various attractive promotions.
              </p>
            </div>
            <div className="md:order-1">
              <ul className="list-disc list-inside">
                <li className="text-lg text-gray-800 mb-2">Secure Payment</li>
                <li className="text-lg text-gray-800 mb-2">
                  Fast Delivery Service
                </li>
                <li className="text-lg text-gray-800 mb-2">
                  Attractive Promos and Discounts
                </li>
                <li className="text-lg text-gray-800 mb-2">A trusted seller</li>
                <li className="text-lg text-gray-800 mb-2">
                  Customer Satisfaction Guarantee
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailEcommerce;
