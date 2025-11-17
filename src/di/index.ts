import { CommonRegistery } from "./common.registry";
import { ControllerRegistry } from "./controller.registry";
import { RepositoryRegistry } from "./repository.registry";
import { ServiceRegistey } from "./service.registry";



export class DependencyInjection{
    static registerAll(): void{
        RepositoryRegistry.registerRepositories(),
        ServiceRegistey.registerServices(),
        ControllerRegistry.registerController()
        CommonRegistery.registerCommon()
    }
}