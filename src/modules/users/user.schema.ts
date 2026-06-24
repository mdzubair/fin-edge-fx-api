

// import mongoose, { Schema } from "mongoose";
// import bcrypt from "bcryptjs";
// import { UserData, UserStatus, UserType } from "../../interface/index.interface";

// const UserSchema = new Schema<UserData>(
//   {
//     firstName: { type: String, required: [true, "First name is required"], trim: true, minlength: [2, "First name too short"], maxlength: [50, "First name too long"], index: true, },
//     lastName: { type: String, required: [true, "Last name is required"], trim: true, minlength: [2, "Last name too short"], maxlength: [50, "Last name too long"], index: true, },
//     email: { type: String, required: [true, "Email is required"], trim: true, lowercase: true, unique: true, index: true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"], },
//     password: { type: String, required: [true, "Password is required"], minlength: [6, "Password too short"], },
//     username: { type: String, trim: true, unique: true, index: true, minlength: [3, "Username too short"], maxlength: [30, "Username too long"],  },
//     appPass: { type: String, trim: true, select: false, },
//     dob: { type: Date, default: null,},
//     phone: { type: String, required: [true, "Phone number is required"], unique: true, trim: true, index: true, validate: { validator: function (value: string) { return /^[6-9]\d{9}$/.test(value); }, message: "Invalid Indian phone number", }, },
//     address: { type: String,},
//     accType: { type: String, trim: true, index: true, default:"Standerd"},
//     wallet: { type: Number, default: 0, min: [0, "Wallet balance cannot be negative"], index: true,},
//     userType: { type: Number, enum: Object.values(UserType).filter(   (value) => typeof value === "number" ), default: UserType.USER, index: true, },
//     status: { type: Number, enum: Object.values(UserStatus).filter(   (value) => typeof value === "number" ), default: UserStatus.ACTIVE, index: true, },
//     profile: { type: String, default: null, },
//     doc: { type: String, default: null, },
//     upi: { type: String, trim: true, lowercase: true, sparse: true, match: [/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID"], },
//     city: { type: String, trim: true, index: true, default: null, },
//     state: { type: String, trim: true, default: null, },
//     country: { type: String, trim: true, default: "India", index: true, },
//     zip: { type: String, trim: true, },
//     firstDeposit: { type: Number, default: 0, index: true, },
//   },
//   { timestamps: true, versionKey: false, collection: "users", }
// );

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) { return; }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// UserSchema.pre("save", function (next) {
//   if (!this.username && this.email) {
//     const random = Math.floor(1000 + Math.random() * 9000);
//     this.username = `${this.email.split("@")[0]}${random}`;
//   }
// });


// UserSchema.methods.comparePassword = async function (
//   password: string
// ): Promise<boolean> {
//   return await bcrypt.compare(password, this.password);
// };

// const UserModel =
//   mongoose.models.User ||
//   mongoose.model<UserData>("User", UserSchema);

// export default UserModel;


// import mongoose, { Schema } from "mongoose";
// import bcrypt from "bcryptjs";
// import {
//   UserData,
//   UserStatus,
//   UserType,
// } from "../../interface/index.interface";

// const UserSchema = new Schema<UserData>(
//   {
//     firstName: {
//       type: String,
//       required: [true, "First name is required"],
//       trim: true,
//       minlength: [2, "First name too short"],
//       maxlength: [50, "First name too long"],
//       index: true,
//     },

//     lastName: {
//       type: String,
//       required: [true, "Last name is required"],
//       trim: true,
//       minlength: [2, "Last name too short"],
//       maxlength: [50, "Last name too long"],
//       index: true,
//     },

//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       trim: true,
//       lowercase: true,
//       unique: true,
//       index: true,
//       match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"],
//     },

//     password: {
//       type: String,
//       required: [true, "Password is required"],
//       minlength: [6, "Password too short"],
//     },

//     username: {
//       type: String,
//       trim: true,
//       unique: true,
//       sparse: true,
//       index: true,
//       minlength: [3, "Username too short"],
//       maxlength: [30, "Username too long"],
//     },

//     appPass: {
//       type: String,
//       trim: true,
//       select: false,
//     },

//     dob: {
//       type: Date,
//       default: null,
//     },

//     phone: {
//       type: String,
//       required: [true, "Phone number is required"],
//       trim: true,
//       unique: true,
//       index: true,
//       validate: {
//         validator: function (value: string) {
//           return /^[6-9]\d{9}$/.test(value);
//         },
//         message: "Invalid Indian phone number",
//       },
//     },

//     address: {
//       type: String,
//       default: null,
//     },

//     accType: {
//       type: String,
//       trim: true,
//       index: true,
//       default: "Standard",
//     },

//     wallet: {
//       type: Number,
//       default: 0,
//       min: [0, "Wallet balance cannot be negative"],
//       index: true,
//     },

//     userType: {
//       type: Number,
//       enum: Object.values(UserType).filter(
//         (value) => typeof value === "number"
//       ),
//       default: UserType.USER,
//       index: true,
//     },

//     status: {
//       type: Number,
//       enum: Object.values(UserStatus).filter(
//         (value) => typeof value === "number"
//       ),
//       default: UserStatus.ACTIVE,
//       index: true,
//     },

//     profile: {
//       type: String,
//       default: null,
//     },

//     doc: {
//       type: String,
//       default: null,
//     },

//     upi: {
//       type: String,
//       trim: true,
//       lowercase: true,
//       sparse: true,
//       match: [/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID"],
//     },

//     city: {
//       type: String,
//       trim: true,
//       index: true,
//       default: null,
//     },

//     state: {
//       type: String,
//       trim: true,
//       default: null,
//     },

//     country: {
//       type: String,
//       trim: true,
//       default: "India",
//       index: true,
//     },

//     zip: {
//       type: String,
//       trim: true,
//     },

//     firstDeposit: {
//       type: Number,
//       default: 0,
//       index: true,
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//     collection: "users",
//   }
// );
// /**
//  * Generate Username Automatically
//  */
// UserSchema.pre("validate", function (next) {
//   if (!this.username && this.email) {
//     const random = Math.floor(1000 + Math.random() * 9000);
//     this.username = `${this.email.split("@")[0]}${random}`;
//   }
//   // next();
// });

// /**
//  * Hash Password Before Save
//  */
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return;
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// /**
//  * Compare Password Method
//  */
// UserSchema.methods.comparePassword = async function ( password: string): Promise<boolean> {
//   return bcrypt.compare(password, this.password);
// };

// /**
//  * Transform Duplicate Key Error
//  */
// UserSchema.post("save", function (error: any, doc: any, next: any) {
//   if (error?.code === 11000) {
//     const field = Object.keys(error.keyPattern)[0];
//     return next(
//       new Error(
//         `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
//       )
//     );
//   }

//   next(error);
// });

// const UserModel =
//   mongoose.models.User ||
//   mongoose.model<UserData>("User", UserSchema);

// export default UserModel;


import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import {
  UserData,
  UserStatus,
  UserType,
} from "../../interface/index.interface";

const UserSchema = new Schema<UserData>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name too short"],
      maxlength: [50, "First name too long"],
      index: true,
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name too short"],
      maxlength: [50, "Last name too long"],
      index: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password too short"],
    },

    username: {
      type: String, 
      trim: true,
      unique: true,
      sparse: true,
      minlength: [3, "Username too short"],
      maxlength: [30, "Username too long"],
    },

    appPass: {
      type: String,
      trim: true,
      select: false,
    },

    dob: {
      type: Date,
      default: null,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[6-9]\d{9}$/.test(value);
        },
        message: "Invalid Indian phone number",
      },
    },

    address: {
      type: String,
      default: null,
    },

    accType: {
      type: String,
      trim: true,
      index: true,
      default: "Standard",
    },

    wallet: {
      type: Number,
      default: 0,
      min: [0, "Wallet balance cannot be negative"],
      index: true,
    },

    userType: {
      type: Number,
      enum: Object.values(UserType).filter(
        (value) => typeof value === "number"
      ),
      default: UserType.USER,
      index: true,
    },

    status: {
      type: Number,
      enum: Object.values(UserStatus).filter(
        (value) => typeof value === "number"
      ),
      default: UserStatus.ACTIVE,
      index: true,
    },

    profile: {
      type: String,
      default: null,
    },

    doc: {
      type: String,
      default: null,
    },

    upi: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
      match: [/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID"],
    },

    city: {
      type: String,
      trim: true,
      index: true,
      default: null,
    },

    state: {
      type: String,
      trim: true,
      default: null,
    },

    country: {
      type: String,
      trim: true,
      default: "India",
      index: true,
    },

    zip: {
      type: String,
      trim: true,
    },

    firstDeposit: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "users",
  }
);

/**
 * Auto Generate Username
 */
UserSchema.pre("validate", function (next) {
  if (!this.username && this.email) {
    const random = Math.floor(1000 + Math.random() * 9000);
    this.username = `${this.email.split("@")[0]}${random}`;
  }
  // next();
  return;
});

/**
 * Hash Password Before Save
 */
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
      return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);  
});

/**
 * Compare Password
 */
UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

/**
 * Duplicate Key Error Handler
 */
UserSchema.post(
  "save",
  function (error: any, doc: any, next: (err?: Error) => void) {
    if (error?.name === "MongoServerError" && error?.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0];

      return next(
        new Error(
          `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } already exists`
        )
      );
    }

    next(error);
  }
);

const UserModel =
  mongoose.models.User ||
  mongoose.model<UserData>("User", UserSchema);

export default UserModel;