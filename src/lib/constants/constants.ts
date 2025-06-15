const BACKGROUND_SIZE = {
  xs: {
    width: 360,
    height: 258,
  },
  sm: {
    width: 430,
    height: 300,
  },
  md: {
    width: 615,
    height: 430,
  },
  xl: {
    width: 1180,
    height: 820,
  },
};

const INVESTING_GAME_INITIAL_POINT = {
  LITTLE_PIG: 700,
};

// 그냥 클릭했을때 눌리는 효과 여기에 써둘게
// active:scale-95 transition-all duration-100
// className="active:scale-95 transition-all duration-100"

const IMAGE_URLS = {
  common: {
    coin: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749845855/user-coin_nbpwdm",
    name: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749845855/user-name_xyiwu8",
    logout:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749847143/logout_dzoadd",
  },
  main: {
    bg: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749831440/main-background_lviawu",
    popo: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-popo_b21l9f",
    quiz: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749845179/main-quiz_y8wptc",
    attendance:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749845179/main-attendance_mgavdh",
    market:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-market_vgxt72",
    diary:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833241/main-diary_g3zxla",
    raising:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-raising_hj1oyq",
    saving:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-saving_afcqna",
    quest:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-quest_z5swuz",
    investing:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-investing_wtfhom",
  },
  market: {
    bg: "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749349063/market_bg_j6qlx5",
    popo: "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749349063/market_popo_lr9sm4",
    npc_shop:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749349063/market_npc_shop_jn4mox",
    npc_shop_bg:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749349063/npc_shop_bg_twcppj",
    inventory:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749349063/market_inventory_l4fukp",
    inventory_bg:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749349063/inventory_bg_mpmlen",
    parent_shop:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749349063/market_parent_shop_oq0kvo",
    parent_shop_bg:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749349063/parent_shop_bg_el0my1",
    wood_title:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749349063/wood_title_lfdikm",
    wood_title_parent:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/wood_title_parent_jjdjp9",
    modal_popo:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/shop_popo_pai28k",
  },
  items: {
    donut:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/donut_nwgs8g.webp",
    icecream:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/icecream_i4ujjj.webp",
    cookie:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/cookie_wkipjd.webp",
    cheese:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/cheese_hqymu2.webp",
    hamburger:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/hamburger_md6xet.webp",
    carrot:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/carrot_i3xbjj.webp",
    Bungeoppang:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/Bungeoppang_lfkhh8.webp",
    bread:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/bread_nykeqe.webp",
    broccoli:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/broccoli_nmpcqu.webp",
    fish: "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/fish_hqsqfs.webp",
    feed2:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/feed2_tdcvbu.webp",
    apple:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/apple_dyzpm6.webp",
    feed: "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/feed_ipplbf.webp",
    watermelon:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/watermelon_vrrndc.webp",
    strawberry:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/strawberry_kkh2sv.webp",
    dish: "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749382424/dish_pnmiis.webp",
  },
  attandance: {
    circle_popo:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749515991/circle_popo_weqpf5.webp",
    masic_popo:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/v1749515991/masic_popo_sgclsk",
  },
};

export { BACKGROUND_SIZE, INVESTING_GAME_INITIAL_POINT, IMAGE_URLS };
