import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSecretGate } from '../../context/SecretGateContext';

interface SecretGateRouteProps {
  children: React.ReactNode;
}

/**
 * SecretGateRoute:
 * Protects admin routes from being visited or discovered directly.
 * If the user has not unlocked the portal via the secret link or authorized shortcut,
 * they will be silently redirected to the home page ("/") as if the admin routes do not exist.
 */
export const SecretGateRoute: React.FC<SecretGateRouteProps> = ({ children }) => {
  const { isGateUnlocked } = useSecretGate();

  if (!isGateUnlocked) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
