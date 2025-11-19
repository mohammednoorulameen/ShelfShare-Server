import { container } from "tsyringe";
import { IVerificationServices } from "../../types/service-interface/IVerificationService";
import { AuthEvents, authEvents } from "../auth.events";

export function registerUserEventListner() {
  const VerificationServices = container.resolve<IVerificationServices>(
    "IVerificationServices"
  );
  authEvents.on(AuthEvents.UserRegistered, async ({ email, role, userId }) => {
    try {
      console.log("it is work");
      await VerificationServices.sendVerificationEmail(email, role, userId);
    } catch (error) {
      console.error(`Failed To Send Email Verification ${email}`, error);
    }
  });
}

export function registerVendorEventListner() {
  const VerificationServices = container.resolve<IVerificationServices>(
    "IVerificationServices"
  );
  authEvents.on(
    AuthEvents.VendorRegistered,
    async ({ email, role, vendorId }) => {
      try {
        console.log("it is work");
        await VerificationServices.sendVerificationEmail(email, role, vendorId);
      } catch (error) {
        console.error(`Failed To Send Email Verification ${email}`, error);
      }
    }
  );
}
