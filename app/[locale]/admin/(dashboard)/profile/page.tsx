'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Save, User, Mail, Lock, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProfilePage() {
  const locale = useLocale();

  // Mock current user data
  const [profile, setProfile] = useState({
    name: 'Ahmad Santoso',
    email: 'ahmad.santoso@jogjabudaya.id',
    role: 'Admin',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSaveProfile = () => {
    alert(locale === 'id' ? 'Profil akan disimpan ke backend' : 'Profile will be saved to backend');
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert(locale === 'id' ? 'Password baru tidak cocok' : 'New passwords do not match');
      return;
    }
    alert(locale === 'id' ? 'Password akan diubah' : 'Password will be changed');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">
          {locale === 'id' ? 'Pengaturan Profil' : 'Profile Settings'}
        </h2>
        <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">
          {locale === 'id' ? 'Kelola informasi akun Anda' : 'Manage your account information'}
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">{locale === 'id' ? 'Profil' : 'Profile'}</TabsTrigger>
          <TabsTrigger value="password">{locale === 'id' ? 'Keamanan' : 'Security'}</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <div className="bg-card p-6 rounded-xl border border-border space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] flex items-center justify-center text-white text-2xl font-bold">
                {profile.name.charAt(0)}
              </div>
              <div>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  {locale === 'id' ? 'Upload Foto' : 'Upload Photo'}
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG {locale === 'id' ? 'hingga' : 'up to'} 2MB
                </p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {locale === 'id' ? 'Nama Lengkap' : 'Full Name'}
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>{locale === 'id' ? 'Peran' : 'Role'}</Label>
                <div className="px-3 py-2 bg-muted rounded-md text-sm text-muted-foreground">
                  {profile.role}
                </div>
                <p className="text-xs text-muted-foreground">
                  {locale === 'id' ? 'Peran tidak dapat diubah sendiri' : 'Role cannot be changed by yourself'}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white">
                <Save className="w-4 h-4 mr-2" />
                {locale === 'id' ? 'Simpan Perubahan' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="password" className="space-y-4">
          <div className="bg-card p-6 rounded-xl border border-border space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--javanese-brown-text)] mb-1">
                {locale === 'id' ? 'Ubah Password' : 'Change Password'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {locale === 'id'
                  ? 'Pastikan password Anda kuat dan unik untuk keamanan akun'
                  : 'Ensure your password is strong and unique for account security'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  {locale === 'id' ? 'Password Saat Ini' : 'Current Password'}
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">{locale === 'id' ? 'Password Baru' : 'New Password'}</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  placeholder="••••••••"
                />
                <p className="text-xs text-muted-foreground">
                  {locale === 'id' ? 'Minimal 8 karakter, kombinasi huruf dan angka' : 'Minimum 8 characters, combination of letters and numbers'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{locale === 'id' ? 'Konfirmasi Password Baru' : 'Confirm New Password'}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleChangePassword} variant="destructive">
                <Lock className="w-4 h-4 mr-2" />
                {locale === 'id' ? 'Ubah Password' : 'Change Password'}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
