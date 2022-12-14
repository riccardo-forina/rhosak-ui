import type { VoidFunctionComponent } from "react";
import { Route } from "react-router-dom";
import { RedirectOnGateError } from "../RedirectOnGateError";
import {
  CreateKafkaInstanceRoute,
  DeleteKafkaInstanceRoute,
  KafkaInstancesRoute,
} from "./routes";
import { ChangeOwnerRoute } from "./routes/ChangeOwnerRoute";
import {
  ControlPlaneChangeOwnerPath,
  ControlPlaneDeleteInstancePath,
  ControlPlaneNewInstancePath,
  ControlPlaneRoutePath,
} from "./routesConsts";

export const ControlPlaneRoutes: VoidFunctionComponent = () => {
  return (
    <Route path={ControlPlaneRoutePath} exact>
      <Route path={ControlPlaneNewInstancePath}>
        <CreateKafkaInstanceRoute instancesHref={"/kafkas"} />
      </Route>
      <RedirectOnGateError redirectUrl={"/kafkas"}>
        <Route path={ControlPlaneDeleteInstancePath}>
          <DeleteKafkaInstanceRoute instancesHref={"/kafkas"} />
        </Route>
        <Route path={ControlPlaneChangeOwnerPath}>
          <ChangeOwnerRoute instancesHref={"/kafkas"} />
        </Route>
      </RedirectOnGateError>
      <KafkaInstancesRoute
        getUrlForInstance={(instance) => `/kafkas/${instance.id}/details`}
      />
    </Route>
  );
};
