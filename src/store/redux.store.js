import authSlice from "@/store/features/auth/reducers/authSlice.reducer.js";
import registrationSlice from "@/store/features/registrations/reducers/registrationSlice.reducers.js";
import sellerSlice from "@/store/features/sellers/reducers/sellerSlice.reducer.js";
import purchaseSlice from "@/store/features/purchaser/reducers/purchaseSlice.reducers.js";
import witnessesSlice from "@/store/features/witnesses/reducers/witnessSlice.reducer.js";
import propertiesSlice from "@/store/features/properties/reducers/propertySlice.reducer.js";
import masterSlice from "@/store/features/master/reducers/masterSlice.reducer.js";
import copySourceSlice from "@/store/features/copySource/reducer/copySourceSlice.reducer.js";
import masterFileSlice from "@/store/features/masterFile/reducers/masterFileSlice.reducer.js";
import invoiceSlice from "@/store/features/invoices/reducers/invoiceSlice.reducer.js";
import receiptSlice from "@/store/features/receipts/reducers/receiptSlice.reducer.js";
import builderSlice from "@/store/features/builders/reducers/builderSlice.reducer.js";
import citySurveySlice from "@/store/features/citySurvey/reducers/citySurveySlice.reducer.js";
import khetiSlice from "@/store/features/kheti/reducers/khetiSlice.reducer.js";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
  authentication: authSlice,
  registration: registrationSlice,
  seller: sellerSlice,
  purchase: purchaseSlice,
  witness: witnessesSlice,
  property: propertiesSlice,
  master: masterSlice,
  copySource: copySourceSlice,
  masterFile: masterFileSlice,
  invoices: invoiceSlice,
  receipts: receiptSlice,
  builders: builderSlice,
  citySurvey: citySurveySlice,
  kheti: khetiSlice,
  },
});

export default store;
