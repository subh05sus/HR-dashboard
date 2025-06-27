"use client";

import type React from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { useSessionPersistence } from "@/hooks/useSessionPersistence";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AnimatedTabs } from "@/components/animated-tabs";
import {
  ArrowLeft,
  Star,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Mock data generators (same as before)
const generateBio = (name: string) => {
  const bios = [
    `${name} is a dedicated professional with over 5 years of experience in their field. Known for exceptional problem-solving skills and team collaboration.`,
    `${name} brings innovative thinking and strong leadership qualities to every project. Passionate about continuous learning and professional development.`,
    `${name} is a results-driven individual with a proven track record of exceeding expectations. Excellent communication skills and attention to detail.`,
    `${name} combines technical expertise with creative problem-solving. A reliable team player who thrives in fast-paced environments.`,
  ];
  return bios[Math.floor(Math.random() * bios.length)];
};

const generatePerformanceHistory = () => {
  return Array.from({ length: 6 }, (_, index) => ({
    period: `Q${(index % 4) + 1} ${2024 - Math.floor(index / 4)}`,
    rating: Math.floor(Math.random() * 5) + 1,
    feedback: [
      "Excellent performance and exceeded targets",
      "Strong team collaboration and leadership",
      "Innovative solutions and problem-solving",
      "Consistent delivery and reliability",
      "Great communication and client relations",
    ][Math.floor(Math.random() * 5)],
  }));
};

const generateProjects = () => {
  const projects = [
    { name: "Customer Portal Redesign", status: "Completed", progress: 100 },
    { name: "Mobile App Development", status: "In Progress", progress: 75 },
    { name: "Database Migration", status: "Planning", progress: 25 },
    { name: "API Integration", status: "Completed", progress: 100 },
  ];
  return projects.slice(0, Math.floor(Math.random() * 3) + 2);
};

export default function EmployeeDetailPage() {
  const params = useParams();
  const { users, addFeedback, getFeedbackForUser } = useUserStore();
  const { session } = useSessionPersistence();
  const [feedback, setFeedback] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0);

  const userId = Number.parseInt(params.id as string);
  const user = users.find((u) => u.id === userId);

  const userFeedback = getFeedbackForUser(userId);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Employee Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The employee you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const bio = generateBio(`${user.firstName} ${user.lastName}`);
  const performanceHistory = generatePerformanceHistory();
  const projects = generateProjects();

  const getDepartmentColor = (department: string) => {
    const colors = {
      HR: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Engineering:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Sales:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Support:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    };
    return (
      colors[department as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addFeedback({
      userId: user.id,
      rating: feedbackRating,
      comment: feedback.trim(),
      author: session?.user?.name || session?.user?.email || "Anonymous",
    });

    toast("Feedback submitted successfully!");
    setFeedback("");
    setFeedbackRating(0);
  };

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Performance History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceHistory.map((period, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">{period.period}</div>
                      <div className="text-sm text-muted-foreground">
                        {period.feedback}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(period.rating)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: "projects",
      label: "Projects",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Current Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    <Badge
                      variant={
                        project.status === "Completed"
                          ? "default"
                          : project.status === "In Progress"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {project.progress}%
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "feedback",
      label: "Feedback",
      content: (
        <div className="space-y-6">
          {/* Submit New Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Submit Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex items-center space-x-1 mt-2">
                    {Array.from({ length: 5 }, (_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setFeedbackRating(index + 1)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 transition-colors ${
                            index < feedbackRating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300 hover:text-yellow-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {feedbackRating > 0
                        ? `${feedbackRating}/5`
                        : "Select rating"}
                    </span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your feedback about this employee's performance..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[120px] mt-2"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!feedback.trim() || feedbackRating === 0}
                >
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Previous Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Previous Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              {userFeedback.length > 0 ? (
                <div className="space-y-4">
                  {userFeedback.map((fb) => (
                    <motion.div
                      key={fb.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(fb.rating)}
                          <span className="text-sm text-muted-foreground ml-2">
                            ({fb.rating}/5)
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(fb.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm">{fb.comment}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        By: {fb.author}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No feedback yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Employee Profile</h1>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24 mx-auto md:mx-0">
                <AvatarImage
                  src={user.image || "/placeholder.svg"}
                  alt={`${user.firstName} ${user.lastName}`}
                />
                <AvatarFallback className="text-2xl">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 mt-2">
                  <Badge className={getDepartmentColor(user.department)}>
                    {user.department}
                  </Badge>
                  <div className="flex items-center justify-center md:justify-start space-x-1">
                    {renderStars(user.rating)}
                    <span className="text-sm text-muted-foreground ml-2">
                      ({user.rating}/5)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Age: {user.age}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>New York, NY</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Animated Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatedTabs tabs={tabs} defaultTab="overview" />
      </motion.div>
    </motion.div>
  );
}
