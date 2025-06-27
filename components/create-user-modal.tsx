"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUserStore } from "@/store/useUserStore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Loader2, CheckCircle, Upload, User } from "lucide-react";

interface CreateUserForm {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  phone: string;
  department: string;
  image: string;
}

const departments = [
  "HR",
  "Engineering",
  "Sales",
  "Support",
  "Marketing",
  "Finance",
];

export function CreateUserModal() {
  const { users, setUsers } = useUserStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<CreateUserForm>>({});
  const [form, setForm] = useState<CreateUserForm>({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    phone: "",
    department: "",
    image: "/placeholder.svg",
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateUserForm> = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    } else if (users.some((user) => user.email === form.email)) {
      newErrors.email = "Email already exists";
    }
    if (!form.age.trim()) {
      newErrors.age = "Age is required";
    } else if (
      isNaN(Number(form.age)) ||
      Number(form.age) < 18 ||
      Number(form.age) > 100
    ) {
      newErrors.age = "Age must be between 18 and 100";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\+?[\d\s\-]+$/.test(form.phone)) {
      newErrors.phone = "Invalid phone format";
    }
    if (!form.department) newErrors.department = "Department is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newUser = {
      id: Math.max(...users.map((u) => u.id), 0) + 1,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      age: Number(form.age),
      phone: form.phone.trim(),
      department: form.department,
      rating: Math.floor(Math.random() * 5) + 1,
      image: form.image || "/placeholder.svg",
    };

    setUsers([...users, newUser]);
    setLoading(false);
    setSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        phone: "",
        department: "",
        image: "/placeholder.svg",
      });
      setErrors({});
      setSuccess(false);
      setOpen(false);
    }, 2000);
  };

  const handleInputChange = (field: keyof CreateUserForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4" variant="default" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Create User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Employee</DialogTitle>
          <DialogDescription>
            Add a new employee to the HR system. All fields are required.
          </DialogDescription>
        </DialogHeader>
        {success && (
          <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Employee created successfully!
            </AlertDescription>
          </Alert>
        )}{" "}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-start gap-6">
            <div className="relative w-24 flex-shrink-0">
              <div className="mb-2 flex justify-center">
                <Avatar className="h-24 w-24 border-2 border-muted">
                  {form.image && form.image !== "/placeholder.svg" ? (
                    <AvatarImage src={form.image} alt="Profile picture" />
                  ) : (
                    <AvatarFallback className="bg-primary-50 text-primary">
                      <User className="h-12 w-12 opacity-70" />
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              <div className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  disabled={loading || success}
                  onClick={() => {
                    // For demo purposes, set a random avatar
                    const randomAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()
                      .toString(36)
                      .substring(7)}`;
                    handleInputChange("image", randomAvatar);
                  }}
                >
                  <Upload className="mr-1 h-3 w-3" />
                  Upload
                </Button>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className={
                      errors.firstName
                        ? "border-red-500 ring-1 ring-red-500"
                        : ""
                    }
                    disabled={loading || success}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName" className="font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className={
                      errors.lastName
                        ? "border-red-500 ring-1 ring-red-500"
                        : ""
                    }
                    disabled={loading || success}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={
                    errors.email ? "border-red-500 ring-1 ring-red-500" : ""
                  }
                  disabled={loading || success}
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age" className="font-medium">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={form.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className={
                      errors.age ? "border-red-500 ring-1 ring-red-500" : ""
                    }
                    disabled={loading || success}
                    placeholder="30"
                  />
                  {errors.age && (
                    <p className="mt-1 text-xs text-red-500">{errors.age}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone" className="font-medium">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className={
                      errors.phone ? "border-red-500 ring-1 ring-red-500" : ""
                    }
                    disabled={loading || success}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="department" className="font-medium">
                  Department
                </Label>
                <Select
                  value={form.department}
                  onValueChange={(value: string) =>
                    handleInputChange("department", value)
                  }
                  disabled={loading || success}
                >
                  <SelectTrigger
                    className={
                      errors.department
                        ? "border-red-500 ring-1 ring-red-500"
                        : ""
                    }
                  >
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.department}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading || success}
              className="px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || success}
              className="px-6"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {success
                ? "Created!"
                : loading
                ? "Creating..."
                : "Create Employee"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
