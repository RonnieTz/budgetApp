"use client";
import { Auth0Provider } from "@auth0/auth0-react";

import React, { Children } from "react";

const AuthProvider = ({ children }: any) => {
  return (
    <Auth0Provider
      domain="dev-z2pg8okbd2qyzjqb.eu.auth0.com"
      clientId="zVBMUYHhTPZ2Afo3IHEcMh8o0G9hGgWD"
      authorizationParams={{
        redirect_uri:
          typeof window !== "undefined" ? window.location.origin : undefined,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
