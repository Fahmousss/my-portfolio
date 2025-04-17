"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { LoginForm } from "@/components/page/login-form";
import { RepositoryForm } from "@/components/admin/repository-form";
import { ProfileForm } from "@/components/admin/profile-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  useRepositories,
  useProfileData,
  type Repository,
  type ProfileData,
} from "@/hooks/use-github-data";
import { Loader2, Plus, Edit, Trash2, LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const { isAuthenticated, logout, isLoading } = useAuth();
  const [repositories, setRepositories] = useRepositories();
  const [profileData, setProfileData] = useProfileData();
  const [activeTab, setActiveTab] = useState("repositories");
  const [isAddingRepo, setIsAddingRepo] = useState(false);
  const [editingRepo, setEditingRepo] = useState<Repository | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [repoToDelete, setRepoToDelete] = useState<Repository | null>(null);

  // Handle repository operations
  const handleAddRepository = (repository: Repository) => {
    setRepositories([repository, ...repositories]);
    setIsAddingRepo(false);
  };

  const handleUpdateRepository = (repository: Repository) => {
    setRepositories(
      repositories.map((repo) =>
        repo.id === repository.id ? repository : repo
      )
    );
    setEditingRepo(null);
  };

  const handleDeleteRepository = () => {
    if (repoToDelete) {
      setRepositories(
        repositories.filter((repo) => repo.id !== repoToDelete.id)
      );
      toast.success("Repository Deleted", {
        description: `${repoToDelete.name} has been deleted successfully.`,
      });
      setRepoToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  // Handle profile operations
  const handleUpdateProfile = (newProfileData: ProfileData) => {
    setProfileData(newProfileData);
    setIsEditingProfile(false);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">GitHub Profile Admin</h1>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Profile
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="repositories">Repositories</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="repositories">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Manage Repositories</h2>
                <Button onClick={() => setIsAddingRepo(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Repository
                </Button>
              </div>

              <AnimatePresence>
                {isAddingRepo && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
                    <RepositoryForm
                      onSave={handleAddRepository}
                      onCancel={() => setIsAddingRepo(false)}
                    />
                  </motion.div>
                )}

                {editingRepo && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
                    <RepositoryForm
                      repository={editingRepo}
                      onSave={handleUpdateRepository}
                      onCancel={() => setEditingRepo(null)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                {repositories.map((repo) => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{repo.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {repo.description}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingRepo(repo)}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <AlertDialog
                              open={
                                deleteDialogOpen && repoToDelete?.id === repo.id
                              }
                              onOpenChange={setDeleteDialogOpen}
                            >
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => setRepoToDelete(repo)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete the repository
                                    &quot;{repo.name}&quot;. This action cannot
                                    be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDeleteRepository}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
                            {repo.language}
                          </div>
                          <div>Stars: {repo.stars}</div>
                          <div>Forks: {repo.forks}</div>
                          <div>Updated: {repo.updated}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Manage Profile</h2>
                <Button onClick={() => setIsEditingProfile(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>

              <AnimatePresence>
                {isEditingProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
                    <ProfileForm
                      profileData={profileData}
                      onSave={handleUpdateProfile}
                      onCancel={() => setIsEditingProfile(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {!isEditingProfile && (
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Current profile details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Name
                        </h3>
                        <p>{profileData.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Username
                        </h3>
                        <p>{profileData.username}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Bio
                      </h3>
                      <p>{profileData.bio}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Location
                        </h3>
                        <p>{profileData.location}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Join Date
                        </h3>
                        <p>{profileData.joinDate}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Followers
                        </h3>
                        <p>{profileData.followers}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Following
                        </h3>
                        <p>{profileData.following}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
      <Toaster />
    </div>
  );
}
