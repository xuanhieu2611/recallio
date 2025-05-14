"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Bell,
  Book,
  Check,
  Save,
  Target,
  Volume2,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    dailyGoal: 10,
    reviewReminders: true,
    reminderTime: "18:00",
    soundEffects: true,
    pronunciation: true,
    darkMode: "system",
    autoShowDefinition: false,
    reviewInterval: 3,
  })

  const handleSwitchChange = (name) => {
    setSettings((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (name, value) => {
    setSettings((prev) => ({ ...prev, [name]: value[0] }))
  }

  const handleSaveSettings = () => {
    // In a real app, you would save these settings to a database or local storage
    console.log("Saving settings:", settings)

    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    })
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      <p className="text-muted-foreground mt-2">
        Customize your learning experience
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="text-primary h-5 w-5" />
              Learning Goals
            </CardTitle>
            <CardDescription>Set your daily learning targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dailyGoal">Daily word goal</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="dailyGoal"
                  min={1}
                  max={30}
                  step={1}
                  value={[settings.dailyGoal]}
                  onValueChange={(value) =>
                    handleSliderChange("dailyGoal", value)
                  }
                  className="flex-1"
                />
                <span className="w-12 text-center font-medium">
                  {settings.dailyGoal}
                </span>
              </div>
              <p className="text-muted-foreground text-xs">
                Number of new words to learn each day
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reviewInterval">Review interval (days)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="reviewInterval"
                  min={1}
                  max={7}
                  step={1}
                  value={[settings.reviewInterval]}
                  onValueChange={(value) =>
                    handleSliderChange("reviewInterval", value)
                  }
                  className="flex-1"
                />
                <span className="w-12 text-center font-medium">
                  {settings.reviewInterval}
                </span>
              </div>
              <p className="text-muted-foreground text-xs">
                How often to review words you're learning
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="text-primary h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure reminders and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reviewReminders">Daily review reminders</Label>
                <p className="text-muted-foreground text-xs">
                  Receive notifications for scheduled reviews
                </p>
              </div>
              <Switch
                id="reviewReminders"
                checked={settings.reviewReminders}
                onCheckedChange={() => handleSwitchChange("reviewReminders")}
              />
            </div>

            {settings.reviewReminders && (
              <div className="space-y-2">
                <Label htmlFor="reminderTime">Reminder time</Label>
                <Input
                  id="reminderTime"
                  name="reminderTime"
                  type="time"
                  value={settings.reminderTime}
                  onChange={handleInputChange}
                />
                <p className="text-muted-foreground text-xs">
                  When to send daily reminders
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="text-primary h-5 w-5" />
              Audio & Visual
            </CardTitle>
            <CardDescription>Sound and display preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="soundEffects">Sound effects</Label>
                <p className="text-muted-foreground text-xs">
                  Play sounds for actions and achievements
                </p>
              </div>
              <Switch
                id="soundEffects"
                checked={settings.soundEffects}
                onCheckedChange={() => handleSwitchChange("soundEffects")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pronunciation">Word pronunciation</Label>
                <p className="text-muted-foreground text-xs">
                  Automatically play word pronunciations
                </p>
              </div>
              <Switch
                id="pronunciation"
                checked={settings.pronunciation}
                onCheckedChange={() => handleSwitchChange("pronunciation")}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="darkMode">Theme preference</Label>
              <Select
                value={settings.darkMode}
                onValueChange={(value) => handleSelectChange("darkMode", value)}
              >
                <SelectTrigger id="darkMode">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-muted-foreground text-xs">
                Choose your preferred color theme
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="text-primary h-5 w-5" />
              Learning Experience
            </CardTitle>
            <CardDescription>
              Customize how you learn and review
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoShowDefinition">
                  Auto-show definitions
                </Label>
                <p className="text-muted-foreground text-xs">
                  Automatically reveal definitions during review
                </p>
              </div>
              <Switch
                id="autoShowDefinition"
                checked={settings.autoShowDefinition}
                onCheckedChange={() => handleSwitchChange("autoShowDefinition")}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Word sources</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  <Check className="mr-2 h-4 w-4" />
                  Common Words
                </Button>
                <Button variant="outline" className="justify-start">
                  <Check className="mr-2 h-4 w-4" />
                  Academic
                </Button>
                <Button variant="outline" className="justify-start opacity-50">
                  Business
                </Button>
                <Button variant="outline" className="justify-start opacity-50">
                  Technology
                </Button>
              </div>
              <p className="text-muted-foreground text-xs">
                Select word categories to include in your learning
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
