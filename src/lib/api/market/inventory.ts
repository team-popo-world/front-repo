import apiClient from "../axios";
export interface InventoryItem {
  productId: string;
  name: string;
  imageUrl: string;
  stock: number;
  type: string;
  exp: number;
}

export const getInventory = async (): Promise<InventoryItem[]> => {
  try {
    const response = await apiClient.get("/api/store/inventory");
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

// [
//   {
//     productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     name: "string",
//     imageUrl: "string",
//     stock: 0,
//     type: "string",
//     exp: 0,
//   }
// ];
