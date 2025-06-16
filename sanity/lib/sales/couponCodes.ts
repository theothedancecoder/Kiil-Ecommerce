export const COUPON_CODES ={
    BFRIDAY : "BFRIDAY",
    SUMMER : "SUMMER",
    WINTER : "WINTER",
    XMAS2025 : "XMAS2025",
    NY2026 : "NY2026",
} as const

export type Coupon_Code = keyof typeof COUPON_CODES