import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { Pencil, Plus, Search, Trash2, UserRound } from "lucide-react";

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
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import customerActions from "@/store/features/customers/actions/customer.actions";

const EMPTY_FORM = {
  name: "",
  village: "",
  taluka: "",
  mobile_number: "",
};

const formatDate = (value) => {
  if (!value) return "—";
  try {
    return format(parseISO(value), "dd MMM yyyy");
  } catch {
    return "—";
  }
};

const Customer = () => {
  const dispatch = useDispatch();
  const { customers = [], status } = useSelector(
    (state) => state.customers ?? {},
  );
  const role = useSelector((state) => state.authentication?.role ?? null);

  const isAdmin = String(role ?? "")
    .toLowerCase()
    .includes("admin");
  const isLoading = status === "loading";

  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    dispatch(customerActions.fetchCustomers());
  }, [dispatch]);

  const filteredCustomers = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return customers;
    return customers.filter((customer) =>
      [customer.name, customer.village, customer.taluka, customer.mobile_number].some(
        (value) => String(value ?? "").toLowerCase().includes(search),
      ),
    );
  }, [customers, query]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setFormOpen(true);
  };

  const openEdit = (customer) => {
    setEditing(customer);
    setForm({
      name: customer.name ?? "",
      village: customer.village ?? "",
      taluka: customer.taluka ?? "",
      mobile_number: customer.mobile_number ?? "",
    });
    setFormError("");
    setFormOpen(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const village = form.village.trim();
    const taluka = form.taluka.trim();
    const mobileNumber = form.mobile_number.replace(/[\s-]/g, "").trim();

    if (!name) {
      setFormError("Name of the customer is required.");
      return;
    }
    if (!mobileNumber) {
      setFormError("Mobile number is required.");
      return;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      setFormError("Mobile number must be 10 digits.");
      return;
    }

    const payload = {
      ...(editing ? { id: editing.id } : {}),
      name,
      village,
      taluka,
      mobile_number: mobileNumber,
    };

    setSaving(true);
    const result = editing
      ? await dispatch(customerActions.updateCustomer(payload))
      : await dispatch(customerActions.createCustomer(payload));
    setSaving(false);

    const succeeded = editing
      ? customerActions.updateCustomer.fulfilled.match(result)
      : customerActions.createCustomer.fulfilled.match(result);

    if (succeeded) setFormOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    const result = await dispatch(customerActions.deleteCustomer(deleteTarget.id));
    setDeleting(false);

    if (customerActions.deleteCustomer.fulfilled.match(result)) {
      setDeleteTarget(null);
    }
  };

  const columnCount = isAdmin ? 7 : 6;

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardContent>
          <div className="mb-4 flex items-center justify-between gap-2 sm:gap-3">
            <div className="relative min-w-0 flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="customer-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search name, village, taluka or mobile..."
                className="pl-8"
              />
            </div>
            {isAdmin && (
              <Button
                onClick={openCreate}
                size="icon"
                aria-label="Add customer"
                title="Add customer"
                className="shrink-0 sm:w-auto sm:gap-1.5 sm:px-2.5"
              >
                <Plus />
                <span className="hidden sm:inline">Add customer</span>
              </Button>
            )}
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader className="bg-muted/60">
                <TableRow>
                  <TableHead className="w-12 pl-2">No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Village</TableHead>
                  <TableHead>Taluka</TableHead>
                  <TableHead className="hidden sm:table-cell">Mobile</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Created At
                  </TableHead>
                  {isAdmin && (
                    <TableHead className="pr-2 text-right">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columnCount}
                      className="h-32 text-center"
                    >
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Spinner />
                        Loading customers...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columnCount} className="p-0">
                      <Empty className="border-0 py-10">
                        <EmptyHeader>
                          <EmptyMedia variant="icon">
                            <UserRound />
                          </EmptyMedia>
                          <EmptyTitle>
                            {query ? "No matching customers" : "No customers yet"}
                          </EmptyTitle>
                          <EmptyDescription>
                            {query
                              ? "Try a different name, village, taluka or mobile number."
                              : "Add your first customer to start recording customer details."}
                          </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                          {isAdmin && !query && (
                            <Button size="sm" onClick={openCreate}>
                              <Plus />
                              Add customer
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
                  filteredCustomers.map((customer, index) => (
                    <TableRow key={customer.id}>
                      <TableCell className="pl-2 text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium">
                        {customer.name || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {customer.village || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {customer.taluka || "—"}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span className="font-mono text-xs">
                          {customer.mobile_number || "—"}
                        </span>
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground sm:table-cell">
                        {formatDate(customer.created_at)}
                      </TableCell>
                      {isAdmin && (
                        <TableCell className="pr-2">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              title="Edit customer"
                              aria-label={`Edit ${customer.name}`}
                              onClick={() => openEdit(customer)}
                            >
                              <Pencil />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="text-destructive hover:text-destructive"
                              title="Delete customer"
                              aria-label={`Delete ${customer.name}`}
                              onClick={() => setDeleteTarget(customer)}
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

      {/* Create / Edit customer */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-md">
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex flex-col gap-5"
          >
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit customer" : "Add customer"}
              </DialogTitle>
            </DialogHeader>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="customer-name">
                  Name of the customer
                </FieldLabel>
                <Input
                  id="customer-name"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="e.g. Jane Doe"
                  autoComplete="chrome-off"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="customer-village">Village name</FieldLabel>
                <Input
                  id="customer-village"
                  name="village"
                  value={form.village}
                  onChange={handleFormChange}
                  placeholder="e.g. Rampur"
                  autoComplete="chrome-off"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="customer-taluka">Taluka name</FieldLabel>
                <Input
                  id="customer-taluka"
                  name="taluka"
                  value={form.taluka}
                  onChange={handleFormChange}
                  placeholder="e.g. Sangli"
                  autoComplete="chrome-off"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="customer-mobile">Mobile number</FieldLabel>
                <Input
                  id="customer-mobile"
                  name="mobile_number"
                  type="tel"
                  inputMode="numeric"
                  value={form.mobile_number}
                  onChange={handleFormChange}
                  placeholder="10-digit mobile number"
                  autoComplete="chrome-off"
                  required
                />
              </Field>
              {formError && <FieldError>{formError}</FieldError>}
            </FieldGroup>

            <DialogFooter className="-mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving && <Spinner />}
                {editing ? "Save changes" : "Add customer"}
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
              Delete {deleteTarget?.name || "this customer"}?
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

export default Customer;
