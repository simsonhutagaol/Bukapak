import Link from "next/link";
import React from "react";

const Banner: React.FC = () => {
  return (
    <section
      className="bg-gray-800 text-white py-20 bg-sky-500/50  "
      style={{
        backgroundImage: `url('https://storage.googleapis.com/chat-storage-123/ecommerce-banner.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto text-center text-black mt-12">
        <br />
        <br />
        <br />
        <br />
        <br />
        <Link
          href="/"
          className=" bg-blue-500 hover:bg-blue-800 text-white py-2 px-6 rounded-full uppercase"
        >
          start shopping
        </Link>
      </div>
    </section>
  );
};

export default Banner;
