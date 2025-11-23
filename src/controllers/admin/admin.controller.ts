import { inject, injectable } from "tsyringe";
import { IVendorService } from "../../types/service-interface/IVendorService";
import { Request, Response } from "express";


@injectable()
export class AdminController {
  constructor(
    @inject("IVendorService") private _vendorService: IVendorService
  ) {}

  async getAllVendors(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await this._vendorService.getAllVendors(page, limit);
    console.log("check result",result)
    res.status(200).json({
      success: true,
      message: "Vendors fetched successfully",
      ...result,
    });
  }
}
