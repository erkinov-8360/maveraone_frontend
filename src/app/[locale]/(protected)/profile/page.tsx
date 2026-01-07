'use client';

import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Profile Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <div className="text-center">
            <Avatar
              src={user?.profilePicture}
              alt={user?.name}
              size="lg"
              className="mx-auto mb-4 h-24 w-24"
            />
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600 mb-2">{user?.email}</p>
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {user?.provider} account
            </div>
            <Button variant="outline" className="w-full mt-4">
              Change Photo
            </Button>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Personal Information
          </h3>

          <form className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              defaultValue={user?.name}
            />

            <Input
              label="Email"
              type="email"
              defaultValue={user?.email}
              disabled
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter phone number"
              />

              <Input
                label="Date of Birth"
                type="date"
              />
            </div>

            <Input
              label="Address"
              type="text"
              placeholder="Enter your address"
            />

            <div className="flex gap-3 pt-4">
              <Button type="submit">
                Save Changes
              </Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <Card className="mt-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Account Actions
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <h4 className="font-semibold text-gray-900">Change Password</h4>
              <p className="text-sm text-gray-600">Update your password regularly</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <h4 className="font-semibold text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Manage your email preferences</p>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-semibold text-red-600">Delete Account</h4>
              <p className="text-sm text-gray-600">Permanently delete your account</p>
            </div>
            <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
