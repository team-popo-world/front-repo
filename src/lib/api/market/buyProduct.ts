import apiClient from "../axios";

interface BuyProductRequest {
  productId: string;
  amount: number;
}

interface BuyProductResponse {
  currentPoint: number;
  purchasedAmount: number;
  totalPrice: number;
}

export const buyProduct = async ({ productId, amount }: BuyProductRequest): Promise<BuyProductResponse> => {
  try {
    console.log(productId, amount);
    const response = await apiClient.post("/api/store/buy", { productId, amount });
    console.log(response);
    if (response.status !== 200) {
      throw new Error("Failed to buy product");
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to buy product", error);
    throw error;
  }
};
