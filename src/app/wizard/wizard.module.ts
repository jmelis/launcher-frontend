import {APP_INITIALIZER, NgModule} from "@angular/core";
import {CommonModule, APP_BASE_HREF} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {Config, ForgeService, History, NgxForgeModule, TokenProvider} from "ngx-forge";

import {KeycloakService} from "../shared/keycloak.service";
import {KeycloakTokenProvider} from "../shared/keycloak-token.provider";
import {TokenService} from "../shared/token.service";

import {FormComponent} from "./wizard.component";
import {EnhancedForgeService} from "../shared/forge.enhance.service";
import {LaunchConfig} from "../shared/config.component";

import {IntroComponent} from "./pages/intro/intro.component";
import {LinkAccountsPage} from "./pages/linkAccounts/link-accounts.page";
import {DeploymentTypePage} from "./pages/deployment/deployment.page";
import {MissionPage} from "./pages/mission/mission.page";
import {RuntimePage} from "./pages/runtime/runtime.page";
import {ProjectInfoPage} from "./pages/projectInfo/projectInfo.page";
import {DeployPage} from "./pages/deploy/deploy.page";
import {NextStepsPage} from "./pages/nextSteps/nextSteps.page";
import {GenericPage} from "./pages/generic/generic.page";

import {StepComponent} from "./components/step/step.component";
import {ProjectNameInputModule} from "./components/project-name-input/project-name-input.component";
import {ButtonComponent} from "./components/button/button.component";
import {AuthenticationDirective} from "../shared/authentication.directive";
import {CiDirective} from "../shared/ci.directive";

import {ModalModule} from "ngx-modal";
import {AsciidocComponent} from "./components/asciidoc/asciidoc.component";
import {AsciidocIndex as AdocIndex } from "./components/asciidoc/asciidoc.index";
import {AsciidocService} from "./components/asciidoc/asciidoc.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProjectNameInputModule,
    NgxForgeModule,
    ModalModule
  ],
  declarations: [
    AsciidocComponent,
    FormComponent,
    IntroComponent,
    LinkAccountsPage,
    DeploymentTypePage,
    MissionPage,
    RuntimePage,
    ProjectInfoPage,
    NextStepsPage,
    DeployPage,
    GenericPage,
    StepComponent,
    ButtonComponent,
    AuthenticationDirective,
    CiDirective
  ],
  providers: [
    AsciidocService,
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: (keycloak: KeycloakService) => () => keycloak.init(),
      deps: [KeycloakService],
      multi: true
    },
    {
      provide: TokenProvider,
      useFactory: (keycloak: KeycloakService) => new KeycloakTokenProvider(keycloak),
      deps: [KeycloakService]
    },
    TokenService,
    History,
    AdocIndex,
    LaunchConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: LaunchConfig) => () => config.load(),
      deps: [LaunchConfig],
      multi: true
    },
    {
      provide: Config,
      useClass: LaunchConfig
    },
    {
      provide: ForgeService,
      useClass: EnhancedForgeService
    }
  ]
})
export class WizardModule {
}