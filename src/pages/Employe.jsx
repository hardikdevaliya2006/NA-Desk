import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { Pencil, Plus, Search, Trash2, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import authActions from "@/store/features/auth/actions/auth.actions";

const DEFAULT_ROLES = ["admin", "user"];

const getInitials = (name, email) => {
  const source = name?.trim() || email?.split("@")[0] || "?";
  return source
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const formatDate = (value) => {
  if (!value) return "—";
  try {
    return format(parseISO(value), "dd MMM yyyy");
  } catch {
    return "—";
  }
};

const roleBadgeVariant = (role) =>
  String(role ?? "").toLowerCase().includes("admin") ? "default" : "outline";

const Employe = () => {
  const dispatch = useDispatch();
  const { usersWithRole = [], status, role } = useSelector(
    (state) => state.authentication ?? {},
  );

  const isAdmin = String(role ?? "").toLowerCase().includes("admin");
  const isLoading = status === "loading";

  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    dispatch(authActions.fetchEmployees());
  }, [dispatch]);

  const employees = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return usersWithRole;
    return usersWithRole.filter((employee) =>
      [employee.name, employee.email, employee.role].some((value) =>
        String(value ?? "").toLowerCase().includes(search),
      ),
    );
  }, [usersWithRole, query]);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", email: "", password: "", role: "user" });
    setFormError("");
    setFormOpen(true);
  };

  const openEdit = (employee) => {
    setEditing(employee);
    setForm({
      name: employee.name ?? "",
      email: employee.email ?? "",
      password: "",
      role: employee.role ?? "user",
    });
    setFormError("");
    setFormOpen(true);
  };

  const handleFormChange = (event) => {
    const { id, value } = event.target;
    setForm((current) => ({ ...current, [id]: value }));
    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const password = form.password.trim();

    if (!name || !email) {
      setFormError("Name and email are required.");
      return;
    }
    if (!editing && !password) {
      setFormError("Password is required for a new employee.");
      return;
    }

    const payload = editing
      ? {
          user_id: editing.user_id,
          name,
          email,
          role: form.role,
          ...(password ? { password } : {}),
        }
      : { name, email, password, role: form.role };

    setSaving(true);
    const result = editing
      ? await dispatch(authActions.updateEmployee(payload))
      : await dispatch(authActions.createEmployee(payload));
    setSaving(false);

    const succeeded = editing
      ? authActions.updateEmployee.fulfilled.match(result)
      : authActions.createEmployee.fulfilled.match(result);

    if (succeeded) {
      setFormOpen(false);
      // Re-fetch so table rows get fresh ids / created_at from the roles table.
      dispatch(authActions.fetchEmployees());
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    const result = await dispatch(
      authActions.deleteEmployee(deleteTarget.user_id),
    );
    setDeleting(false);

    if (authActions.deleteEmployee.fulfilled.match(result)) {
      setDeleteTarget(null);
    }
  };

  const columnCount = isAdmin ? 5 : 4;

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardContent>
          <div className="mb-4 flex items-center justify-between gap-2 sm:gap-3">
            <div className="relative min-w-0 flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="employee-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search name, email or role..."
                className="pl-8"
              />
            </div>
            {isAdmin && (
              <Button
                onClick={openCreate}
                size="icon"
                aria-label="Add employee"
                title="Add employee"
                className="shrink-0 sm:w-auto sm:gap-1.5 sm:px-2.5"
              >
                <Plus />
                <span className="hidden sm:inline">Add employee</span>
              </Button>
            )}
          </div>

          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader className="bg-muted/60">
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead className="hidden sm:table-cell">Joined</TableHead>
                  {isAdmin && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && employees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columnCount} className="h-32 text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Spinner />
                        Loading employees...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : employees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columnCount} className="p-0">
                      <Empty className="border-0 py-10">
                        <EmptyHeader>
                          <EmptyMedia variant="icon">
                            <Users />
                          </EmptyMedia>
                          <EmptyTitle>
                            {query ? "No matching employees" : "No employees yet"}
                          </EmptyTitle>
                          <EmptyDescription>
                            {query
                              ? "Try a different name, email or role."
                              : "Create your first employee to give them access to NA Desk."}
                          </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                          {isAdmin && !query && (
                            <Button size="sm" onClick={openCreate}>
                              <Plus />
                              Add employee
                            </Button>
                          )}
                          {query && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setQuery("")}
                            >
                              Clear search
                            </Button>
                          )}
                        </EmptyContent>
                      </Empty>
                    </TableCell>
                  </TableRow>
                ) : (
                  employees.map((employee) => (
                    <TableRow key={employee.user_id ?? employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                            {getInitials(employee.name, employee.email)}
                          </div>
                          <div className="grid min-w-0 leading-tight">
                            <span className="truncate font-medium">
                              {employee.name || "—"}
                            </span>
                            <span className="truncate text-xs text-muted-foreground">
                              {employee.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={roleBadgeVariant(employee.role)}
                          className="capitalize"
                        >
                          {employee.role || "user"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs">
                          {employee.password || "—"}
                        </span>
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground sm:table-cell">
                        {formatDate(employee.created_at)}
                      </TableCell>
                      {isAdmin && (
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              title="Edit employee"
                              aria-label={`Edit ${employee.name || employee.email}`}
                              onClick={() => openEdit(employee)}
                            >
                              <Pencil />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="text-destructive hover:text-destructive"
                              title="Delete employee"
                              aria-label={`Delete ${employee.name || employee.email}`}
                              onClick={() => setDeleteTarget(employee)}
                            >
                              <Trash2 />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create / Edit employee */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit employee" : "Add employee"}
              </DialogTitle>
            </DialogHeader>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="emp-name">Name</FieldLabel>
                <Input
                  id="emp-name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="e.g. Jane Doe"
                  autoComplete="name"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="emp-email">Email</FieldLabel>
                <Input
                  id="emp-email"
                  type="email"
                  value={form.email}
                  onChange={handleFormChange}
                  placeholder="jane@company.com"
                  autoComplete="email"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="emp-password">
                  Password
                  {editing && (
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      (leave blank to keep current)
                    </span>
                  )}
                </FieldLabel>
                <Input
                  id="emp-password"
                  type="password"
                  value={form.password}
                  onChange={handleFormChange}
                  placeholder={editing ? "••••••••" : "Enter a password"}
                  autoComplete="new-password"
                  required={!editing}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="emp-role">Role</FieldLabel>
                <Select
                  value={form.role}
                  onValueChange={(value) =>
                    setForm((current) => ({ ...current, role: value }))
                  }
                >
                  <SelectTrigger id="emp-role" className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEFAULT_ROLES.map((option) => (
                      <SelectItem key={option} value={option} className="capitalize">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              {formError && <FieldError>{formError}</FieldError>}
            </FieldGroup>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving && <Spinner />}
                {editing ? "Save changes" : "Create employee"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {deleteTarget?.name || deleteTarget?.email}?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting && <Spinner />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Employe;
