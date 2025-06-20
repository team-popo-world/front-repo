import apiClient from "../axios";

export interface InventoryItem {
  productId: string;
  name: string;
  imageUrl: string;
  stock: number;
  type: string;
  exp: number;
  price: number;
  purchasedAt: string;
}


export const getInventory = async (): Promise<InventoryItem[]> => {
  try {
    const response = await apiClient.get("/api/store/inventory");
    console.log(response.data);
    if (response.status !== 200) {
      throw new Error("Failed to fetch inventory");
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch inventory", error);
    return [];
  }
};

