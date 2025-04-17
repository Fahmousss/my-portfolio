"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  useActivities,
  useProfileData,
  useRepositories,
  useStarredRepos,
} from "@/hooks/use-github-data";
import { Toaster } from "../ui/sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Code2,
  GitFork,
  MapPin,
  MessageSquare,
  Plus,
  Star,
  Users,
} from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { Textarea } from "../ui/textarea";

export default function GitHubProfile() {
  const [activeTab, setActiveTab] = useState("repositories");
  const [repositories] = useRepositories();
  const [starredRepos] = useStarredRepos();
  const [activities] = useActivities();
  const [profileData] = useProfileData();
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const profileVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  return (
    <motion.div
      className="container mx-auto py-6 px-4 md:px-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Profile Header */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        <motion.div className="space-y-4" variants={profileVariants}>
          <motion.div
            className="w-full flex justify-center"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar className="w-full h-auto max-w-5/6 rounded-full border border-gray-200">
              <AvatarImage
                src="https://picsum.photos/id/1/300/300"
                alt="Profile"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </motion.div>
          <motion.div className="space-y-2" variants={itemVariants}>
            <h1 className="text-2xl font-bold">{profileData.name}</h1>
            <p className="text-muted-foreground">{profileData.username}</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="text-sm text-muted-foreground mb-4">
              {profileData.bio}
            </p>
            <div className="flex gap-2 items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <Button className="w-full">Follow</Button>
              </motion.div>
              <ModeToggle />
            </div>
          </motion.div>
          <motion.div className="space-y-2 text-sm" variants={itemVariants}>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                <strong>{profileData.followers}</strong> followers ·{" "}
                <strong>{profileData.following}</strong> following
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{profileData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {profileData.joinDate}</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="space-y-6" variants={containerVariants}>
          {/* Tabs Navigation */}
          <Tabs
            defaultValue="repositories"
            onValueChange={setActiveTab}
            value={activeTab}
          >
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <TabsTrigger
                  value="repositories"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:shadow-none"
                >
                  <Code2 className="h-4 w-4 mr-2" />
                  Repositories{" "}
                  <Badge className="ml-2 bg-muted text-muted-foreground">
                    {repositories.length}
                  </Badge>
                </TabsTrigger>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:shadow-none"
                >
                  Projects{" "}
                  <Badge className="ml-2 bg-muted text-muted-foreground">
                    4
                  </Badge>
                </TabsTrigger>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <TabsTrigger
                  value="stars"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:shadow-none"
                >
                  Stars{" "}
                  <Badge className="ml-2 bg-muted text-muted-foreground">
                    {starredRepos.length}
                  </Badge>
                </TabsTrigger>
              </motion.div>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="repositories" className="pt-6">
                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-2 mb-6">
                    <input
                      type="text"
                      placeholder="Find a repository..."
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-10">
                        Type <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-10">
                        Language <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-10">
                        Sort <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Repository List */}
                  <div className="space-y-4">
                    {repositories.map((repo, i) => (
                      <motion.div
                        key={repo.id}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{
                          scale: 1.02,
                          boxShadow:
                            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Card className="border">
                          <CardHeader className="p-4">
                            <div className="flex justify-between">
                              <div>
                                <CardTitle className="text-lg font-semibold text-blue-600">
                                  <a href="#" className="hover:underline">
                                    {repo.name}
                                  </a>
                                </CardTitle>
                                <CardDescription className="mt-1">
                                  {repo.description}
                                </CardDescription>
                              </div>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Button variant="outline" size="sm">
                                  <Star
                                    className="mr-2 h-4 w-4"
                                    fill={
                                      repo.isStarred ? "currentColor" : "none"
                                    }
                                  />
                                  {repo.isStarred ? "Starred" : "Star"}
                                </Button>
                              </motion.div>
                            </div>
                          </CardHeader>
                          <CardFooter className="p-4 pt-0 flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
                              {repo.language}
                            </div>
                            <div className="flex items-center">
                              <Star className="mr-1 h-4 w-4" />
                              {repo.stars}
                            </div>
                            <div className="flex items-center">
                              <GitFork className="mr-1 h-4 w-4" />
                              {repo.forks}
                            </div>
                            <div>Updated {repo.updated}</div>
                            <Button variant="ghost" size="sm">
                              {repo.notes ? "Edit Note" : "Add Note"}
                            </Button>
                          </CardFooter>

                          {/* Notes editor */}
                          {editingNotes === repo.id && (
                            <div className="p-4 pt-0">
                              <Textarea
                                placeholder="Add your notes about this repository..."
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                className="mb-2"
                              />
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditingNotes(null)}
                                >
                                  Cancel
                                </Button>
                                <Button size="sm">Save Note</Button>
                              </div>
                            </div>
                          )}

                          {/* Display saved notes */}
                          {repo.notes && editingNotes !== repo.id && (
                            <div className="p-4 pt-0 border-t mt-2">
                              <h4 className="text-sm font-medium mb-1">
                                Your Notes:
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {repo.notes}
                              </p>
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="pt-6">
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-lg font-medium mb-2">
                      Create your first project
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Projects help you organize and prioritize your work.
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New project
                      </Button>
                    </motion.div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="stars" className="pt-6">
                  <div className="space-y-4">
                    {starredRepos.map((repo, i) => (
                      <motion.div
                        key={repo.id}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{
                          scale: 1.02,
                          boxShadow:
                            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Card className="border">
                          <CardHeader className="p-4">
                            <div className="flex justify-between">
                              <div>
                                <CardTitle className="text-lg font-semibold text-blue-600">
                                  <a href="#" className="hover:underline">
                                    {repo.owner}/{repo.name}
                                  </a>
                                </CardTitle>
                                <CardDescription className="mt-1">
                                  {repo.description}
                                </CardDescription>
                              </div>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Button variant="outline" size="sm">
                                  <Star
                                    className="mr-2 h-4 w-4"
                                    fill="currentColor"
                                  />
                                  Unstar
                                </Button>
                              </motion.div>
                            </div>
                          </CardHeader>
                          <CardFooter className="p-4 pt-0 flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <span className="w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
                              {repo.language}
                            </div>
                            <div className="flex items-center">
                              <Star className="mr-1 h-4 w-4" />
                              {repo.stars}
                            </div>
                            <div className="flex items-center">
                              <GitFork className="mr-1 h-4 w-4" />
                              {repo.forks}
                            </div>
                            <Button variant="ghost" size="sm">
                              {repo.notes ? "Edit Note" : "Add Note"}
                            </Button>
                          </CardFooter>

                          {/* Notes editor */}
                          {editingNotes === repo.id && (
                            <div className="p-4 pt-0">
                              <Textarea
                                placeholder="Add your notes about this repository..."
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                className="mb-2"
                              />
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditingNotes(null)}
                                >
                                  Cancel
                                </Button>
                                <Button size="sm">Save Note</Button>
                              </div>
                            </div>
                          )}

                          {/* Display saved notes */}
                          {repo.notes && editingNotes !== repo.id && (
                            <div className="p-4 pt-0 border-t mt-2">
                              <h4 className="text-sm font-medium mb-1">
                                Your Notes:
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {repo.notes}
                              </p>
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base font-medium">
                  Recent activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.7, duration: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    {activity.type === "commit" && (
                      <Code2 className="h-5 w-5 text-muted-foreground" />
                    )}
                    {activity.type === "star" && (
                      <Star className="h-5 w-5 text-muted-foreground" />
                    )}
                    {activity.type === "issue" && (
                      <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    )}
                    {activity.type === "fork" && (
                      <GitFork className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{activity.action}</span>{" "}
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
      <Toaster />
    </motion.div>
  );
}

// Sample data
