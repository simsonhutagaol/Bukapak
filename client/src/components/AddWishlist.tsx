"use client";

import { ObjectId } from "mongodb";
import Swal from "sweetalert2";
import { FunctionComponent } from "react";

interface AddProps {
  productId: ObjectId;
}
export const AddWishlist: FunctionComponent<AddProps> = ({ productId }) => {
  async function handleAdd() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      }
    );
    const responseJson: { message: string; status: number; error: string } =
      await response.json();

    if (!response.ok || responseJson.error) {
      if (responseJson.error) {
        Swal.fire({
          text: "First login your account or register",
          icon: "error",
        });
      } else {
        Swal.fire({
          text: responseJson.message,
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        text: responseJson.message,
        icon: "success",
      });
    }
  }

  return (
    <button
      onClick={() => handleAdd()}
      className="bg-blue-400 text-black py-2 px-4 mt-4  hover:bg-blue-200 "
    >
      Add to Wishlist
    </button>
  );
};
