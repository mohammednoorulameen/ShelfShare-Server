import { container } from "tsyringe";
import { AuthRoutes } from "../routes/auth/auth.routes";
import { AdminRoutes } from "../routes/admin/admin.routes";
import { UserRoutes } from "../routes/user/user.routes";

export class RoutesRegistry{
    static registerRoutes():void{
        container.register(AuthRoutes,{
            useClass : AuthRoutes
        });
        container.register(AdminRoutes,{
            useClass : AdminRoutes
        });
        container.register(UserRoutes,{
            useClass : UserRoutes
        });
    }
}