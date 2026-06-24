import { Schema } from "mongoose";
// ==========================================
// Withdraw
// ==========================================
export enum WithdrawPayType { BANK = "India local banks", PAYPAL = "PayPal", PAYTM = "PAYTM", STRIPE = "Stripe", RAZORPAY = "Razorpay", }
export enum WithdrawStatus { PENDING = 0, COMPLETE = 1, REJECT = 2, }
export interface WithdrawData { _id?: string; userId: Schema.Types.ObjectId; amount: number; payType: string; status?: WithdrawStatus; createdAt?: Date; updatedAt?: Date; }

// ==========================================
// Ticket
// ==========================================
export enum TicketStatus { OPEN = 0, CLOSED = 1, }
export interface TicketData { _id?: string; userId: Schema.Types.ObjectId; token: string; subject: string; message: string; status?: TicketStatus; createdAt?: Date; updatedAt?: Date; }

// ==========================================
// Ticket Reply
// ==========================================
export interface TicketReplyData { _id?: string; userId: Schema.Types.ObjectId; ticketId: Schema.Types.ObjectId; message: string; createdAt?: Date; updatedAt?: Date; }

// ==========================================
// Receipt
// ==========================================
export enum PayByStatus { UPI= "UPI", BANK= "BANK_TRANSFER",}
export enum ReceiptStatus { PENDING = 0, APPROVED = 1, REJECTED = 2,}
export interface ReceiptData { _id?: string; amount: number; receipt: string; status?: ReceiptStatus; userId: Schema.Types.ObjectId; accId: Schema.Types.ObjectId; payBy: PayByStatus; createdAt?: Date; updatedAt?: Date; }

// ==========================================
// Offer
// ==========================================
export enum OfferStatus { PENDING = 0, ACTIVE = 1, EXPIRED = 2, REJECTED = 3, }
export enum OfferApplyTo {
  ALL = "all",
  SELECTED = "selected",
}
export interface OfferData { _id?: string; applyTo: OfferApplyTo; userId: Schema.Types.ObjectId[] | null; offerNote: string; offerDate: Date; amount: number; status?: OfferStatus; createdAt?: Date; updatedAt?: Date; }

// ==========================================
// Help Support
// ==========================================
export enum HelpSupportStatus { PENDING = 0, COMPLETE = 1, REJECT = 2, }
export interface HelpSupportData { _id?: string; userId: Schema.Types.ObjectId; replyId?: Schema.Types.ObjectId; title: string; message: string; status?: HelpSupportStatus; createdAt?: Date; updatedAt?: Date; }

// ==========================================
// Deposit
// ==========================================
export enum DepositPayType { ADD_VAL = "add_val", LESS_VAL = "less_val" }
export interface DepositData { _id?: string; userId: Schema.Types.ObjectId; crAmount: number; preAmount: number; processAmount?:number; payType: DepositPayType; createdAt?: Date; updatedAt?: Date; }

// ==========================================
// Currency
// ==========================================
export interface CurrencyData { _id?: string; country: string; currencyVal: number; currencyIcon: string; createdAt?: Date; updatedAt?: Date; }

// ==========================================
// Contact Us
// ==========================================
export interface ContactUsData { _id?: string; firstName: string; lastName: string; accNumber: string; email: string; phone: string; reason: string; message: string; terms: boolean; createdAt?: Date; updatedAt?: Date; }

// ==========================================
// Account
// ==========================================
export enum AccountStatus { PENDING = 0, ACTIVE = 1, REJECTED = 2, }
export interface AccountData { _id?: string; userId: Schema.Types.ObjectId; upi?: string; bankName: string; holderName: string; accNo: string; ifscCode: string; qr?: string; note?: string; status?: AccountStatus; createdAt?: Date; updatedAt?: Date; }

// ==========================================
// User
// ==========================================
export enum UserType { USER = 0, ADMIN = 1, }
export enum UserStatus { ACTIVE = 1, BLOCKED = 2, UNVERIFIED = 3, }
export interface UserData {
     _id?: string; accType: string; wallet: number; appPass?: string; userType?: UserType; status?: UserStatus; profile?: string; doc?: string; upi?: string; firstName: string; lastName: string; email: string; username: string; password: string; dob?: Date; phone: string; address: string; city?: string; state?: string; country?: string; zip?: string; firstDeposit?: number; createdAt?: Date; updatedAt?: Date;
}
export interface FormPayloadData { _id?: string; userId: Schema.Types.ObjectId; username: string; password: string; server: string; createdAt?: Date; updatedAt?: Date; }
