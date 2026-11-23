import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import authActions from "@/store/features/auth/actions/auth.actions";
import { clearError } from "@/store/features/auth/reducers/authSlice.reducer";

export function LoginForm({ className, ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.authentication.status);
  const error = useSelector((state) => state.authentication.error);

  const [values, setValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const isSubmitting = status === "loading";
  const errorMessage =
    typeof error === "string" ? error : error ? "Login failed" : null;

  const handleChange = (event) => {
    const { id, value } = event.target;
    setValues((current) => ({ ...current, [id]: value }));
    if (errorMessage) dispatch(clearError());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(clearError());

    const result = await dispatch(authActions.loginUser(values));

    if (authActions.loginUser.fulfilled.match(result)) {
      await dispatch(authActions.getUserRole());
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome Back.</h1>
                <p className="text-balance text-muted-foreground">
                  Login to Your Account
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your work email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="pr-10"
                    required
                    value={values.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    onMouseDown={(event) => event.preventDefault()}
                    className="absolute inset-y-0 right-1 z-10 flex items-center gap-1 rounded-md px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </Field>

              {errorMessage && <FieldError>{errorMessage}</FieldError>}

              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Spinner />}
                  {!isSubmitting && "Login"}
                </Button>
              </Field>
            </FieldGroup>
          </form>

          <div className="relative hidden overflow-hidden bg-muted md:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,var(--primary)_35%,transparent),transparent_55%),radial-gradient(circle_at_80%_80%,color-mix(in_oklch,var(--accent)_60%,transparent),transparent_55%)]" />
            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_10%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_10%,transparent)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="relative flex h-full items-center justify-center p-10">
              <div className="rounded-2xl border bg-card/80 p-8 text-center backdrop-blur-sm">
                <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                  NA Desk
                </p>
                <p className="mt-2 text-2xl font-semibold text-balance">
                  Your work, all in one place.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
