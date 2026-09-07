export interface ProtectedRoute {
  path: string;

  requiresAuth: boolean;
}

export const ProtectedRoutes: ProtectedRoute[] = [
  {
    path: "/orders",
    requiresAuth: true,
  },

  {
    path: "/profile",
    requiresAuth: true,
  },
];

export const isProtectedRoute = (
  path: string
) =>
  ProtectedRoutes.some(
    (route) =>
      route.path === path &&
      route.requiresAuth
  );

// تمام اطلاعات Navigation از navigation.ts خوانده می‌شود.
// تشخیص اینکه یک Route نیاز به لاگین دارد، فقط توسط ProtectedRoute() انجام می‌شود.