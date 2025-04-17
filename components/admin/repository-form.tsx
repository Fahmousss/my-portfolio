"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import type { Repository } from "@/hooks/use-github-data";

interface RepositoryFormProps {
  repository?: Repository;
  onSave: (repository: Repository) => void;
  onCancel: () => void;
}

export function RepositoryForm({
  repository,
  onSave,
  onCancel,
}: RepositoryFormProps) {
  const isEditing = !!repository;

  const [formData, setFormData] = useState<Partial<Repository>>(
    repository || {
      name: "",
      description: "",
      language: "TypeScript",
      stars: 0,
      forks: 0,
      updated: "Just now",
      isStarred: false,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }));
  };

  const handleLanguageChange = (value: string) => {
    setFormData((prev) => ({ ...prev, language: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      toast.warning("Validation Error", {
        description: "Name and description are required",
      });
      return;
    }

    // Generate an ID if it's a new repository
    const completeData: Repository = {
      ...(formData as Repository),
      id: repository?.id || `repo-${Date.now()}`,
    };

    onSave(completeData);
    toast.success(isEditing ? "Repository Updated" : "Repository Created", {
      description: `${completeData.name} has been ${
        isEditing ? "updated" : "created"
      } successfully.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? "Edit Repository" : "Add New Repository"}
        </CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the repository information below"
            : "Fill in the details to create a new repository"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Repository Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., awesome-project"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="A brief description of the repository"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Primary Language</Label>
              <Select
                value={formData.language}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TypeScript">TypeScript</SelectItem>
                  <SelectItem value="JavaScript">JavaScript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Java">Java</SelectItem>
                  <SelectItem value="Go">Go</SelectItem>
                  <SelectItem value="Rust">Rust</SelectItem>
                  <SelectItem value="C#">C#</SelectItem>
                  <SelectItem value="PHP">PHP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="updated">Last Updated</Label>
              <Input
                id="updated"
                name="updated"
                value={formData.updated}
                onChange={handleChange}
                placeholder="e.g., 2 days ago"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stars">Stars</Label>
              <Input
                id="stars"
                name="stars"
                type="number"
                value={formData.stars}
                onChange={handleNumberChange}
                min={0}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="forks">Forks</Label>
              <Input
                id="forks"
                name="forks"
                type="number"
                value={formData.forks}
                onChange={handleNumberChange}
                min={0}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update Repository" : "Create Repository"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
